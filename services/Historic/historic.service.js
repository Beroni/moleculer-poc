module.exports = {
  name: "historic",
  actions: {
    async index(ctx) {
      const { user_id } = ctx.params;

      const userHistoric = await ctx.call("historics.find", {
        query: {
          user_id
        },
        sort: ["created_at"]
      });

      return userHistoric[userHistoric.length - 1];
    }
  }
};
