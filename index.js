const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const corsMiddleWare = cors();
app.use(corsMiddleWare);

const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

const userRoutes = require("./src/user/router-user");
const eventRoutes = require("./src/events/router-event");
//const { streamRouter, stream } = require("./src/stream/router");

app.use(userRoutes);
app.use(eventRoutes);
//app.use(room(stream));
//app.use(streamRouter);

app.get("/test", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
