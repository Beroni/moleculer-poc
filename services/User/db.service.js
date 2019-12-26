const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const bcrypt = require("bcrypt");

const dbConfig = require("../../src/config/database");
const User = require("../../src/models/User");

module.exports = {
  name: "users",
  mixins: [DbService],
  adapter: new SqlAdapter(dbConfig),
  model: User,
  hooks: {
    before: {
      create: async ctx => {
        ctx.params.password = await bcrypt.hash(ctx.params.password, 8);
      }
    }
  }
};
