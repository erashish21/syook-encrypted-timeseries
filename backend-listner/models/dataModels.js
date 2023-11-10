// backend-listener/models/dataModel.js
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: String,
  origin: String,
  destination: String,
  secret_key: String,
  timestamp: { type: Date, default: Date.now },
});

const DataModel = mongoose.model("DataModel", dataSchema);

module.exports = DataModel;
