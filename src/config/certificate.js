const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  token: process.env.D4SIGN_TOKEN,
  crypt: process.env.D4SIGN_CRYPT,
  url: process.env.D4SIGN_DEV_URL,
  safe: process.env.D4SIGN_SAFE_UUID
};
