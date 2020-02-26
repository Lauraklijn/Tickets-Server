const { Router } = require("express");
//const auth = require("../auth/middleWare");
const Event = require("./model-event");
const Ticket = require("../tickets/model-ticket");

const router = new Router();

router.get("/event", (req, res, next) => {
  Event.findAll()
    .then(event => res.json(event))
    .catch(error => next(error));
});

// router.post("/event", async (request, response) => {
//   //console.log(request.user.dataValues.id);
//   const event = await Event.create(...request.body);
//   return response.status(201).send(event);
// });

// router.post("/event", auth, async (request, response) => {
//   console.log(request.user.dataValues.id);
//   const newEvent = { ...request.body, userId: request.user.dataValues.id };
//   const event = await Event.create(newEvent);
//   return response.status(201).send(event);
// });

router.post("/event", async (req, res, next) => {
  try {
    await Event.create({
      ...req.body
    });
    res.status(201).send("Event created");
  } catch (error) {
    next(error);
  }
});
// -------------> The page limit for the get All events request
// router.get("/event", (req, res, next) => {
//   const limit = req.query.limit || 2;
//   const offset = req.query.offset || 0;
//   Event.findAndCountAll({ limit, offset })
//     .then(resultPerPage =>
//       res.json({ data: resultPerPage.rows, total: resultPerPage.count })
//     )
//     .catch(error => next(error));
// });

router.get("/event/:id", (req, res, next) => {
  Event.findByPk(req.params.eventId, { include: [Ticket] })
    .then(event => {
      res.send(event);
    })
    .catch(next);
});

router.put("/event/:id", (req, res, next) => {
  Team.findByPk(req.params.eventId)
    .then(event => {
      console.log("EVENT FOUND???????????????????", event);
      if (event) {
        event.update(req.body).then(event => res.json(event));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

module.exports = router;
