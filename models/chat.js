const mongoose = require("mongoose");

// Define chat schema
const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    maxLength: 100000
  },
  time: {
    type: Date,
    default: Date.now
  },
});

// Create model
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
