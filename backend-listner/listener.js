// backend-listener/listener.js
const server = require("http").createServer();
const io = require("socket.io")(server);
const crypto = require("crypto");
const mongoose = require("mongoose");
const moment = require("moment");
const dataModel = require("./models/dataModel");

const mongoDBUrl =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/data-db";
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on("connection", (socket) => {
  console.log("Listener connected to Emitter");

  socket.on("dataStream", (encryptedStream) => {
    const passKey = process.env.AES_PASS_KEY || "default_pass_key";
    const decipher = crypto.createDecipheriv(
      "aes-256-ctr",
      passKey,
      Buffer.from(process.env.AES_IV || "default_aes_iv", "hex")
    );
    // ... (rest of the code)
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Listener service running on port ${PORT}`);
});
