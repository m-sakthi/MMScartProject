const mongoose = require('mongoose');

const channelModel = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: [true, "Please enter the channel name"],
  // },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const schema = mongoose.model('Channel', channelModel);

module.exports = schema;