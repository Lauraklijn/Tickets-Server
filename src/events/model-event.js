const Sequelize = require("sequelize");
const db = require("../../db");

const Event = db.define("event", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false

    // defaultValue: Sequelize.NOW
  }
});

module.exports = Event;
