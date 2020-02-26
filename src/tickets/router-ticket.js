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

// // Create a new player account
router.post("/tickets", (req, res, next) => {
  // console.log("WHAT IS REQ.BODY", req.body)
  Ticket.create(req.body)
    .then(ticket => res.json(ticket))
    .catch(next);
});

// router.delete("/players/:playerId", (req, res, next) => {
//   // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)
//   // res.send('Some people want to watch the world burn') // -> route works

//   Player.destroy({
//     where: {
//       id: req.params.playerId,
//     }
//   })
//   .then(numDeleted => {
//     if (numDeleted) {
//       res.status(204).end();
//     } else {
//       res.status(404).end();
//     }
//   })
//   .catch(next);
// });

// router.put("/players/:playerId", (req, res, next) => {
//   // res.send('oh hi')
//   // console.log(req.params, 'WRECKED BY PARAMS??')
//   Player.findByPk(req.params.playerId)
//     .then(player => {
//       // console.log("player FOUND?", player)
//       if (player) {
//         player
//           .update(req.body)
//           .then(player => res.json(player));
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch(next);
// });

module.exports = router;
