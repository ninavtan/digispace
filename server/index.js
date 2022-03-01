const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const http = require('http');
const mainRoutes = require('./routes/main');
const authRoutes = require("./routes/auth");
const path = require('path');
const cors = require("cors");
const socketIo = require("socket.io");

var router = express.Router();

mongoose.connect("mongodb://localhost/finalproject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: '*'
}));
app.use(express.static('./server/public'));
app.use(bodyParser.json({ limit: '50mb' }));



const server = http.createServer(app);
//////////// Socket setup ///////////
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");
  sayHi(socket);
  /* drawing event is a custom event that we will create in our sketch.js file later on. Socket.broadcast.emit is used to send out the data to all sockets that are currently online, except the socket that is sending it.
  */

  
  getApiAndEmit(socket);


  socket.on('drawing', (data) => {
    console.log(data);
    socket.broadcast.emit('drawing', data);
  })
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

const sayHi = socket => {
  const response = 'hi biddie :)'
  socket.emit("Greetings", response);
}

app.use(router);

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(mainRoutes);
app.use('/', authRoutes);


app.get("/api", (req, res) => {
  res.json({message: "Hello from Express!"});
});


server.listen(port, () => console.log(`Listening on port ${port}`));

