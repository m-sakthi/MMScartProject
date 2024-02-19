const jwt = require("jsonwebtoken");
const Message = require('./models/messageModel');
const Channel = require('./models/channelModel');

Array.prototype.remove = function (item) {
  var j = 0;

  for (i = 0; i < this.length; i++) {
    if (this[i] !== item) {
      this[j++] = this[i]
    }
  }
  this.length = j;

  return this;
};

const userSockets = {};
const onConnect = (io) => (socket) => {
  // console.log('****** new client connected ***', userSockets, socket.user);

  socket.on('disconnect', (args) => {
    // console.log('*********** disconnected', socket.id, args);
    userSockets[socket.user.id] = userSockets[socket.user.id].remove(socket.id);
  });

  socket.emit('hello', 'Message');

  socket.on('send-message', async ({ channel, txt }) => {
    if (socket.user) {
      // console.log('****** received message from client:', userSockets, channel, socket.id, socket.user);
      const resp = {};
      try {
        const msg = await Message.create({
          sender: socket.user.id,
          channel: channel,
          txt: txt
        });
        resp.data = msg;
      } catch (err) {
        resp.error = err;
      } finally {
        const chatChannel = await Channel.findById(channel);

        for(i = 0; i < chatChannel.members.length; i++) {
          const memberId = chatChannel.members[i].toString();
          if (memberId !== socket.user.id) {
            const connectedSockets = userSockets[memberId];
            if (connectedSockets && connectedSockets.length) {
              for(j = 0; j < connectedSockets.length; j++) {
                io.to(connectedSockets[j]).emit('new-message-received', resp);
              }
            }
          }
        }

        socket.emit('new-message-sent', resp);
      }
    }
  });
}

const authSocketMiddleware = (socket, next) => {
  const token = socket.handshake.query?.key;
  const unauthorised = new Error("NOT AUTHORIZED");

  if (!token) return next(unauthorised);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;

    userSockets[socket.user.id] = userSockets[socket.user.id] ? Array.from(new Set([...userSockets[socket.user.id], socket.id])) : [socket.id];
  } catch (err) {
    return next(unauthorised);
  }
  next();
};

module.exports = {
  onConnect,
  authSocketMiddleware
};