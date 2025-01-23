const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  expirationDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  clicks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Click" }]
});

module.exports = mongoose.model("Link", linkSchema);