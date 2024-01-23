const mongoose = require('mongoose');

const messageModel = new mongoose.Schema({
  txt: {
    type: String,
    required: [true, "Please enter the message"],
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId
  },
});

const schema = mongoose.model('Message', messageModel);

module.exports = schema;