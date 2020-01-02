const { Sequelize } = require("sequelize");

module.exports = {
  name: "template",
  define: {
    name: Sequelize.STRING,
    variables: Sequelize.JSON
  },
  options: {
    timestamps: true
  }
};
