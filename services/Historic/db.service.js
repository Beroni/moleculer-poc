const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const dbConfig = require("../../src/config/database");
const Historic = require("../../src/models/Historic");

module.exports = {
  name: "historics",
  mixins: [DbService],
  adapter: new SqlAdapter(dbConfig),
  model: Historic
};
