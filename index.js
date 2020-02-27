const express = require("express");

const app = express();
const port = process.env.PORT || 5050;

const cors = require("cors");
const corsMiddleWare = cors();
app.use(corsMiddleWare);

const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

const userRoutes = require("./src/user/router-user");
const eventRoutes = require("./src/events/router-event");
const ticketRoutes = require("./src/tickets/router-ticket");

app.use(userRoutes);
app.use(eventRoutes);
app.use(ticketRoutes);

app.get("/test", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
