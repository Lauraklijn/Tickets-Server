const { Router } = require("express");
const Ticket = require("../tickets/model-ticket");
const Event = require("../events/model-event");

const router = new Router();

router.get("/tickets", (req, res, next) => {
  Ticket.findAll()
    .then(tickets => {
      res.send(tickets);
    })
    .catch(next);
});

router.get("/tickets/:id", (req, res, next) => {
  Ticket.findByPk(req.params.id, { include: [Event] })
    .then(ticket => {
      res.send(ticket);
    })
    .catch(next);
});

// // Create a new ticket
router.post("/tickets", (req, res, next) => {
  // console.log("WHAT IS req.body", req.body)
  Ticket.create(req.body)
    .then(ticket => res.json(ticket))
    .catch(next);
});

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

module.exports = router;
