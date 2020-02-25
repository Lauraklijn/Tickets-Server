const { Router } = require("express");
//const auth = require("../auth/middleWare");
const Event = require("./model-event");

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
    res.status(201).send("User created");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
