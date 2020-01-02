const { Sequelize } = require("sequelize");

module.exports = {
  name: "historic",
  define: {
    document_uuid: Sequelize.STRING,
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
