const mongoose = require('mongoose');
const mongooseLeanId = require('mongoose-lean-id');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const channelSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['invited', 'active', 'deleted'],
    default: 'invited'
  },
  category: {
    type: String,
    enum: ['dm', 'group'],
    default: 'dm'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

channelSchema.plugin(mongooseLeanId);
channelSchema.plugin(mongooseLeanVirtuals);

const channelModel = mongoose.model('Channel', channelSchema);

module.exports = channelModel;