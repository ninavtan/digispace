const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const authRoutes = require("./routes/routes.js");
const dataRoutes = require("./routes/main.js");
const path = require("path");
const cors = require("cors");
const socketIo = require("socket.io");
const jwt = require("jwt-simple");
var router = express.Router();
const keys = require("./config/keys");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// DB Setup
mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, function(err, result) {
  if (err) console.log(err)
});

app.use(cors({
  origin: '*'
}));
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
  const transport = socket.conn.transport.name; // in most cases, "polling"
  console.log(transport);
  socket.conn.on("upgrade", () => {
    const upgradedTransport = socket.conn.transport.name; // in most cases, "websocket"
  });

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);
    const { error, user } = addUser({ id: socket.id, name, room });
    

    if(error) return callback(error);
    

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    socket.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    console.log(message);
    let name = message.user;
    
    const user = getUser(name);
    console.log(user);
    
    socket.to(user.room).emit('message', { user: user.name, text: message.text, timestamp: message.timestamp });

    callback({
      status: 'ok'

    });
  });
  

  
  getApiAndEmit(socket);

  socket.on('drawing', (data, callback) => {
    console.log(data);
    socket.broadcast.emit('drawing', data);
    callback({
      status: 'ok'
    });
  })
});

app.use(router);

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(dataRoutes);
app.use('/', authRoutes);


app.get("/api", (req, res) => {
  res.json({message: "Hello from Express!"});
});


if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => console.log(`Listening on port ${port}`));