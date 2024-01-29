const mongoose = require('mongoose');

const messageModel = new mongoose.Schema({
  txt: {
    type: String,
    required: [true, "Please enter the message"],
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'is required']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const schema = mongoose.model('Message', messageModel);

module.exports = schema;