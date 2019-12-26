const dotenv = require("dotenv").config();
const axios = require("axios");

module.exports = {
  name: "contract",
  actions: {
    async createUserFolder(ctx) {
      const url = encodeURI(
        `${process.env.D4SIGN_DEV_URL}folders/${process.env.D4SIGN_SAFE_UUID}/create?tokenAPI=${process.env.D4SIGN_TOKEN}&cryptKey=${process.env.D4SIGN_CRYPT}`
      );

      const response = await axios.post(url, {
        folder_name: ctx.params.email
      });
      return response.data.uuid;
    }
  }
};
