const { Sequelize } = require("sequelize");

module.exports = {
  name: "user",
  define: {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    cpf: Sequelize.STRING,
    country_code: Sequelize.STRING,
    ddd: Sequelize.STRING,
    number: Sequelize.STRING,
    folder_uuid: Sequelize.STRING
  },
  options: {
    timestamps: true
  }
};
