// backend-emitter/emitter.js
const socket = require("socket.io-client");
const crypto = require("crypto");
const { generateRandomData } = require("./controllers/dataController");

const socketServerUrl = "http://localhost:3001"; // Replace with your listener service URL

const socketClient = socket(socketServerUrl);

socketClient.on("connect", () => {
  console.log("Emitter connected to Listener");

  setInterval(() => {
    const messageStream = Array.from(
      { length: getRandomInt(49, 499) },
      generateRandomData
    ).join("|");
    socketClient.emit("dataStream", messageStream);
    console.log("Data Stream Sent:", messageStream);
  }, 10000);
});
