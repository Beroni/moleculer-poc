const config = require("../../src/config/certificate");
const axios = require("axios");

// const authService = require("../../mixins/auth.mixin.js");

module.exports = {
  name: "contract",
  actions: {
    async createUserFolder(ctx) {
      const url = encodeURI(
        `${config.url}folders/${config.safe}/create?tokenAPI=${config.token}&cryptKey=${config.crypt}`
      );

      const response = await axios.post(url, {
        folder_name: ctx.params.email
      });
      return response.data.uuid;
    },
    async getTemplates(ctx) {
      const url = encodeURI(
        `${config.url}/templates/?tokenAPI=${config.token}&cryptKey=${config.crypt}`
      );

      const response = await axios.post(url);
      return response.data;
    },
    async store(ctx) {
      const url = encodeURI(
        `${config.url}/documents/${config.safe}/makedocumentbytemplate?tokenAPI=${config.token}&cryptKey=${config.crypt}`
      );

      const user = await ctx.call("users.find", {
        query: { id: ctx.params.userId }
      });

      const { id, name, folder_uuid } = user[0];

      const response = await axios.post(url, {
        templates: {
          MTQ3: {
            nome_comprador: name,
            nome_produto: ctx.params.variables.nome_produto,
            nome_empresa: "Hubtec"
          }
        },
        name_document: "Documento",
        uuid_folder: folder_uuid
      });

      await ctx.call("historics.create", {
        document_uuid: response.data.uuid,
        user_id: id
      });

      return response.data;
    },
    async addSignatureList(ctx) {
      const user = await ctx.call("users.find", {
        query: { id: 1 }
      });

      const data = await ctx.call("historic.index", { user_id: user[0].id });
      const url = encodeURI(
        `${config.url}/documents/${data.document_uuid}/createlist?tokenAPI=${config.token}&cryptKey=${config.crypt}`
      );

      const response = await axios.post(url, {
        signers: [
          {
            email: user.email,
            act: "1",
            foreign: "0",
            certificadoicpbr: "0",
            assinatura_presencial: "0",
            docauth: "0",
            docauthandselfie: "0",
            embed_methodauth: "email",
            embed_smsnumber: "",
            upload_allow: "0",
            upload_obs: "Contrato Social e Conta de Luz"
          }
        ]
      });

      return response.data;
    },
    async sendToSign(ctx) {}
  }
};
