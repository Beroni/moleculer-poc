const dotenv = require("dotenv").config();

module.exports = {
  email: process.env.PAGSEGURO_EMAIL,
  token: process.env.PAGSEGURO_TOKEN,
  url: process.env.PAGSEGURO_URL,
  url_cctoken: process.env.UOL_CARD_URL
};
