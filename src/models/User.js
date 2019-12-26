const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = {
  name: "user",
  define: {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    folder_uuid: Sequelize.STRING
  },
  options: {
    timestamps: true
  }
};
