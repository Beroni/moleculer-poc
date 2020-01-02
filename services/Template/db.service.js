const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const dbConfig = require("../../src/config/database");
const Template = require("../../src/models/Template");

module.exports = {
  name: "templates",
  mixins: [DbService],
  adapter: new SqlAdapter(dbConfig),
  model: Template
};
