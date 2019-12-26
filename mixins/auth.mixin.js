const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = {
  methods: {
    async jwtValidate(ctx) {
      const authHeader = ctx.meta.authorization;

      const [, token] = authHeader.split(" ");
      try {
        const decoded = await promisify(jwt.verify)(
          token,
          process.env.SECRET_KEY
        );
        ctx.params.userId = decoded.id;
        return;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
