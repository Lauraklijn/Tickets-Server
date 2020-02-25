const Sequelize = require("sequelize");
const db = require("../../db");
const User = require("../user/model-user");

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
    type: Sequelize.DATE,
    allowNull: false
    // defaultValue: Sequelize.NOW
  }
});

//Event.belongsTo(User);
//User.hasMany(Event);

module.exports = Event;
