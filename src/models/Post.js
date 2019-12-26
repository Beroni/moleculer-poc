const { Sequelize, Model } = require("sequelize");

module.exports = {
  name: "post",
  define: {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "user", // Can be both a string representing the table name or a Sequelize model
        key: "id"
      }
    }
  },
  options: {
    timestamps: true
  }
};
