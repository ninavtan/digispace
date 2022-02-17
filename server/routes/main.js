const express = require("express");
const router = require("express").Router();

const Room = require("../models/room.js");
const Settings = require("../models/settings.js");
const User = require("../models/user.js");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const authRoutes = require('../routes/auth');
// app.use('/', authRoutes);

router.get("/nina", (req, res, next) => {       
  res.json({message: "HI NINA~"});
});

function verifyJWT(req, res, next) {
  console.log(req.headers);
  const token = req.headers["authorization"]?.split(' ')[1];
  console.log('Verify JWT: ', token);
  if (token) {
    console.log('This is the token in question: ', token);
    jwt.verify(token, "process.env.JWT_SECRET", (err, decoded) => {
      if (err) return res.json({
        err: err,
        isLoggedIn: false,
        message: "Failed to authenticate"
      })
      req.user = {};
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  } else {
    res.json({message: "incorrect token given", isLoggedIn: false})
  }
};

// Create new fake data
router.get("/create-new-data", (req, res, next) => {

  // let userOne = new User({
  //   username: 'nina777',
  //   first_name: 'Nina',
  //   last_name: 'Tan',
  //   email: 'nina777@gmail.com',
  //   rooms: []
  // });

  let roomOne = new Room({
    name: `nina's fantasy world`,
    user: null,
    roomSettings: null,
    authUsers: []
  });

  let settingsOne = new Settings({
    name: 'Fun & Games',
    userCreated: null,
    roomId: null,
    collabCanvasFunc: true,
    collabCanvasImg: 'https://drive.google.com/uc?id=135G6ScVhaUh0nJmE24HHaRiV326_UJRa',
    sharedMedia: null,
    chatFunc: true
  });

  // userOne.save((err) => {
  //   if (err) throw err;
  // });

  roomOne.save((err) => {
    if (err) throw err;
  });

  settingsOne.save((err) => {
    if (err) throw err;
  });

});

// Push fake database objects to their respective arrays
router.get("/push-new-data", async (req, res, next) => {
  userOne = await User.findOne({ username: 'nina777' }).exec();
  roomOne = await Room.findOne({ username: `nina's fantasy world 2` }).exec();
  settingsOne = await Settings.findOne({ name: 'Fun & Games' }).exec();

  userOne.rooms.push(roomOne._id);
  userOne.save();

  roomOne.user = userOne._id;
  roomOne.roomSettings = settingsOne._id;
  roomOne.authUsers.push(userOne._id);
  roomOne.save();

  settingsOne.userCreated = userOne._id;
  settingsOne.roomId = roomOne._id;
  settingsOne.save();
});



module.exports = router;