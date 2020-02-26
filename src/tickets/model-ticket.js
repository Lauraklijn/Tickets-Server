const Sequelize = require("sequelize");
const db = require("../../db");
const Event = require("../events/model-event");

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

Ticket.belongsTo(Event); // get the Team for this player
Event.hasMany(Ticket); // get me the Players of this team

module.exports = Ticket;
