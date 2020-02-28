const { Router } = require("express");
const Ticket = require("../tickets/model-ticket");
const Event = require("../events/model-event");
const auth = require("../auth/middleWare");

const router = new Router();

router.get("/tickets", (req, res, next) => {
  Ticket.findAll()
    .then(tickets => {
      res.send(tickets);
    })
    .catch(next);
});

router.get("/tickets/:id", (req, res, next) => {
  console.log("TEST ID endpoint", req.params.id);
  Ticket.findByPk(req.params.id, { include: [Event] })
    .then(ticket => {
      res.send(ticket);
    })
    .catch(next);
});

// // Create a new ticket
router.post("/tickets", auth, (req, res, next) => {
  console.log("WHAT IS req.body?", req.body);
  Ticket.create({ ...req.body, userId: req.user.dataValues.id })
    .then(ticket => res.json(ticket))
    .catch(next);
});

// To update Tickets

// router.put("/tickets/:ticketId", (req, res, next) => {
//   // console.log(req.params, 'What is params?')
//   Ticket.findByPk(req.params.ticketId)
//     .then(ticket => {
//       // console.log("player?", player)
//       if (ticket) {
//         ticket.update(req.body).then(ticket => res.json(ticket));
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch(next);
// });

// ---------------------------ALGORITHM------------------------------------------------------------------
router.get("/ticketalgorithm/:id", (req, res, next) => {
  // Have to connect it to front-end
  console.log("How many tickets?", req.params.id);

  // 1. If ticket is the only ticket of the author add 10%:
  return Ticket.findOne({ where: { id: req.params.id } }).then(
    ticketsPerAuthor => {
      console.log(
        "CHECK WHO IS TICKET AUHTOR:",
        ticketsPerAuthor.dataValues.author
      );

      return Ticket.findAndCountAll({
        where: { author: ticketsPerAuthor.dataValues.author }
      })
        .then(ticketsWithAuthorId => {
          console.log(
            "How much ticket has this Author??",
            ticketsWithAuthorId.count
          );
          let riskStatus = 0;
          if (ticketsWithAuthorId.count < 2) {
            riskStatus += 10;
          }
          console.log(
            "WHAT IS RISK STATUS AFTER CHECKING QNT TICKETS??? #1",
            riskStatus
          );
          return riskStatus;
        })
        .then(riskStatus => {
          // 2. if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
          return Ticket.findOne({ where: { id: req.params.id } }).then(
            ticket => {
              console.log(
                "Check ticket to see CreatedAT ",
                ticket.dataValues.createdAt
              );

              const ticketCreatedAt = new Date(
                ticket.dataValues.createdAt
              ).getHours();
              console.log(
                "WHAT TIME????",
                new Date(ticket.dataValues.createdAt).getHours() // Rond uren af
              );
              if (ticketCreatedAt < 9) {
                return (riskStatus += 10);
              } else if (ticketCreatedAt > 17) {
                return (riskStatus += 10);
              } else {
                console.log("STATUS after checking time", riskStatus);
                return (riskStatus -= 10);
              }
            }
          );
        })
        .then(riskStatus => {
          //#3 if the ticket price is lower than the average ticket price for that event, that's a risk
          // if a ticket is X% cheaper than the average price, add X% to the risk
          // if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction

          console.log("Check riskStatus after checking Time #2", riskStatus);
          return Ticket.findAndCountAll()
            .then(ticketList => {
              const pricelist = ticketList.rows.map(tickets => {
                console.log(
                  "Overzicht prijzen per ticket?",
                  tickets.dataValues.price
                );
                return tickets.dataValues.price;
              });
              const reducer = (acc, value) => acc + value;
              totaal = pricelist.reduce(reducer, 0);

              if (totaal != 0) {
                averagePriceTickets = totaal / pricelist.length;
              } else {
                averagePriceTickets = 0;
              }
              console.log("Average Price tickets", averagePriceTickets);
              console.log("total price all tickets", totaal);
              console.log("Array of prices te zien??", pricelist);

              return totaal;
            })
            .then(totaal => {
              return (
                Ticket.findOne({ where: { id: req.params.id } })
                  .then(priceCurrentTicket => {
                    console.log(
                      "Price of the current ticket?",
                      priceCurrentTicket.dataValues.price
                    );
                    priceCurrentTicket.dataValues.price;

                    const priceCurrentTicketCheck =
                      priceCurrentTicket.dataValues.price;
                    console.log(
                      "what is curretticket Check?",
                      priceCurrentTicketCheck
                    );
                    if (totaal != 0) {
                      if (priceCurrentTicketCheck < averagePriceTickets) {
                        riskAddedByPriceAverage = 10;

                        console.log(
                          "WHAT IS RISKADDEDBYPRICEAVerage, Minder dan averageprice werkt deze",
                          riskAddedByPriceAverage
                        );
                        // ---> Eigenlijk checken op hoeveel verschil etc
                      } else if (
                        priceCurrentTicketCheck > averagePriceTickets
                      ) {
                        riskAddedByPriceAverage = 5;
                        console.log(
                          "WHAT IS RISKADDED BY priceAverage, meer dan averagePrice",
                          riskAddedByPriceAverage
                        );
                      }

                      console.log(
                        "What is Riskaddedbyprice Average status",
                        riskAddedByPriceAverage
                      );
                      console.log("What is RiskStatus?", riskStatus);
                    }

                    //-------------------TOTAL RISK-----------------------------------------------
                    const totalRisk = riskAddedByPriceAverage + riskStatus;
                    console.log("What is totalRisk", totalRisk);
                    return totalRisk;
                  })

                  // #5 The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%.
                  //The calculated risk of a ticket depends on many factors. Make sure that the risk value is always "live" (i.e. up to date).

                  .then(value => {
                    let minMaxTotalRisk = Math.min(
                      Math.max(parseInt(value), 5),
                      95
                    );
                    console.log("What is Uiteindleijk risk", minMaxTotalRisk);
                  })

                  .then(ticket => {
                    res.status(200).send(ticket);
                  })
                  .catch(next)
              );
            });
        });
    }
  );
});

// #4 if there are >3 comments on the ticket, add 5% to the risk\
// No time anymore to make a new model etc with the comments

module.exports = router;

// Stappen voor Frond-end To see RISK (Algorithm)

// Create Action - Load_Risk_details (+export)
// Create Reducer - Case: Load_RISK_details // import action
// Create components: Container: componentDidMount (props.params etc)
// component ticketDetails: add risk(props)
