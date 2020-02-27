const Sequelize = require("sequelize");
const db = require("../../db");
const Event = require("../events/model-event");
const User = require("../user/model-user");

const Ticket = db.define("ticket", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Ticket.belongsTo(Event); // Add EventID aan Tickets
Event.hasMany(Ticket); // Get the Tickets of this event

Ticket.belongsTo(User); // Add UserID aan Tickets

module.exports = Ticket;
