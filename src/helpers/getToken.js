const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const sevimaURL = process.env.BASEURL_SEVIMA;

async function getToken() {
  try {
    const response = await axios.post(sevimaURL + "/token", {
      grant_type: "client_credentials",
      client_id: "unpas",
      client_secret: "gM5S5N%4",
    });
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getToken;
