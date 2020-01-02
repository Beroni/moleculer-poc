const Joi = require("joi");

module.exports = {
  name: "template",

  actions: {
    index: {
      params: Joi.object().keys({
        name: Joi.string().required()
      }),
      async handler(ctx) {
        const { name } = ctx.params;

        const templates = await ctx.call("templates.find", {
          query: { name }
        });

        return templates[0];
      }
    },
    store: {
      params: Joi.object().keys({
        name: Joi.string().required(),
        variables: Joi.object().required()
      }),
      async handler(ctx) {
        const { name, variables } = ctx.params;

        const template = await ctx.call("templates.create", {
          name,
          variables
        });

        return template;
      }
    }
  }
};
