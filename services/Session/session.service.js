const config = require("../../src/config/auth");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  name: "session",
  actions: {
    store: {
      params: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
      }),
      async handler(ctx) {
        const { email, password } = ctx.params;

        const user = await ctx.call("users.find", { query: { email: email } });

        if (await !this.checkPassword(password, user.password))
          return { error: "error" };

        const { id, name, cpf, country_code, ddd, number } = user[0];

        return {
          user: { id, name, email, cpf, country_code, ddd, number },
          token: jwt.sign({ id }, config.secret, {
            expiresIn: config.expiresIn
          })
        };
      }
    }
  },
  methods: {
    async checkPassword(password, hash) {
      return await bcrypt.compare(password, hash);
    }
  }
};
