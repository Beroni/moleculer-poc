const dotenv = require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  name: "session",
  actions: {
    async store(ctx) {
      const { email, password } = ctx.params;

      const user = await ctx.call("users.find", { query: { email: email } });

      if (await !this.checkPassword(password, user.password))
        return { error: "Deu merda" };
      console.log(user);

      const { id, name } = user[0];

      return {
        user: { id, name, email },
        token: jwt.sign({ id }, process.env.SECRET_KEY, {
          expiresIn: 60 * 60
        })
      };
    }
  },
  methods: {
    async checkPassword(password, hash) {
      return await bcrypt.compare(password, hash);
    }
  }
};
