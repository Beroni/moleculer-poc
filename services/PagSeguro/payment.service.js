const config = require("../../src/config/pagseguro");
const axios = require("axios");
const xml = require("xml-js");
const qs = require("querystring");

module.exports = {
  name: "payment",

  actions: {
    async createSession(ctx) {
      const response = await axios.post(
        `${config.url}/sessions?email=${config.email}&token=${config.token}`
      );
      const data = xml.xml2js(response.data, { compact: true });

      return { session_id: data.session.id._text };
    },
    async getPaymentMethods(ctx) {
      const { amount, sessionId } = ctx.params;

      const response = await axios.get(
        `${config.url}/payment-methods?amount=${amount}&sessionId=${sessionId}`,
        {},
        {
          Accept: "application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1"
        }
      );

      return response.data;
    },
    async cardFlag(ctx) {
      const { sessionId, cardBin } = req.params;

      const response = await axios.get(
        `https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin?tk=${sessionId}&creditCard=${cardBin}`
      );

      return response.data;
    },
    async cardToken(ctx) {
      const response = await axios.post(
        config.url_cctoken,
        qs.stringify(ctx.params)
      );

      return response.data;
    },
    async installmentConditions(ctx) {
      const { sessionId, amount, cardBrand } = ctx.params;

      const response = await axios.get(
        `${config.url}/installments.json?sessionId=${sessionId}&amount=${amount}&creditCardBrand=${cardBrand}`
      );

      return response.data;
    },
    async creditCard(ctx) {
      const response = await axios.post(
        `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=${config.email}&token=${config.token}`,
        qs.stringify(ctx.params)
      );

      return response.data;
    }
  }
};
