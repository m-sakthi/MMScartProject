const mongoose = require('mongoose');
const mongooseLeanId = require('mongoose-lean-id');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const messageSchema = new mongoose.Schema({
  txt: {
    type: String,
    required: [true, "Please enter the message"],
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channel',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'is required']
  },
}, { timestamps: true });

messageSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

messageSchema.virtual('createdTime').get(function() {
  return this.createdAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
});

messageSchema.virtual('createdDate').get(function() {
  return this.createdAt.toLocaleDateString();
});

messageSchema.set('toObject', { virtuals: true })
messageSchema.set('toJSON', { virtuals: true })

messageSchema.plugin(mongooseLeanId);
messageSchema.plugin(mongooseLeanVirtuals);
const model = mongoose.model('Message', messageSchema);

module.exports = model;