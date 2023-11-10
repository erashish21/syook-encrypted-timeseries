// backend-emitter/controllers/dataController.js
const crypto = require("crypto");
const data = require("../data.json");

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomData = () => {
  const name = data.names[getRandomInt(0, data.names.length - 1)];
  const origin = data.locations[getRandomInt(0, data.locations.length - 1)];
  const destination =
    data.locations[getRandomInt(0, data.locations.length - 1)];

  const originalMessage = {
    name,
    origin,
    destination,
  };

  const secret_key = crypto
    .createHash("sha256")
    .update(JSON.stringify(originalMessage))
    .digest("hex");

  const sumCheckMessage = { ...originalMessage, secret_key };

  const passKey = process.env.AES_PASS_KEY || "default_pass_key";
  const cipher = crypto.createCipheriv(
    "aes-256-ctr",
    passKey,
    Buffer.from(process.env.AES_IV || "default_aes_iv", "hex")
  );
  const encryptedMessage =
    cipher.update(JSON.stringify(sumCheckMessage), "utf-8", "hex") +
    cipher.final("hex");

  return encryptedMessage;
};

module.exports = {
  generateRandomData,
};
