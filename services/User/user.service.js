const Joi = require("joi");

module.exports = {
  name: "user",
  actions: {
    store: {
      params: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string()
          .min(6)
          .required(),
        email: Joi.string()
          .email({
            minDomainSegments: 2
          })
          .required(),
        cpf: Joi.string().required(),
        country_code: Joi.string()
          .min(2)
          .max(2)
          .required(),
        ddd: Joi.string()
          .min(2)
          .max(2)
          .required(),
        number: Joi.string()
          .min(8)
          .max(9)
          .required()
      }),
      async handler(ctx) {
        const {
          name,
          email,
          password,
          cpf,
          country_code,
          ddd,
          number
        } = ctx.params;

        if (
          !(await ctx.call("users.find"),
          {
            query: {
              email: ctx.params.email
            }
          })
        )
          return { error: "Usuário já Criado" };

        const folder_uuid = await ctx.call("contract.createUserFolder", {
          email
        });

        const user = await ctx.call("users.create", {
          name,
          email,
          password,
          folder_uuid,
          cpf,
          country_code,
          ddd,
          number
        });

        return user;
      }
    }
  }
};
