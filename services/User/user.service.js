module.exports = {
  name: "user",
  actions: {
    async store(ctx) {
      const { name, email, password } = ctx.params;

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
        name: name,
        email: email,
        password: password,
        folder_uuid: folder_uuid
      });

      return user;
    },
    async index(ctx) {
      const response = await ctx.call("users.find", {
        query: {
          email: ctx.params.email
        }
      });

      return response;
    }
  }
};
