const app = require('./app');
const http = require('http');
const socketIo = require("socket.io");
const connectDatabase = require('./config/database');


connectDatabase();

// const server = app.listen(process.env.PORT, () => {
//   console.log(`My Server listening to the port: ${process.env.PORT} in  ${process.env.NODE_ENV} `)
// })

const port = process.env.PORT;
app.set('port', );

const server = http.createServer(app);

const io = socketIo(server, { cookie: false });

// const allowedHosts = /localhost:(.*)/;
// io.origins((origins, proceed) => {
//   if (allowedHosts.test(origins))
//     return proceed(null, true);

//   return proceed(new Error('Not allowed by CORS'));
// });

const onConnect = (socket) => {
  console.log('****** new client connected ***', socket.id);

  socket.emit('hello', 'Message');

  socket.on('howdy', (arg) => {
    console.log('****** received message from client:', arg);
  });
}

io.on('connect', onConnect);

server.listen(port);

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled rejection error');
  server.close(() => {
    process.exit(1);
  })
})

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception error');
  server.close(() => {
    process.exit(1);
  })
})



