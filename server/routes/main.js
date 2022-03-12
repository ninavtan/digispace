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

// Create new fake data
router.get("/create-new-data", (req, res, next) => {

  let userOne = new User({
    username: 'kimi',
    first_name: 'kimi',
    last_name: 'drinkwalter',
    email: 'kimi@kimi.com',
    rooms: []
  });

  // let roomOne = new Room({
  //   name: `kimi's korner`,
  //   user: null,
  //   roomSettings: null,
  //   authUsers: [],
  //   gallery: []
  // });

  // let settingsOne = new Settings({
  //   name: `kimi settings`,
  //   userCreated: null,
  //   roomId: null,
  //   collabCanvasFunc: true,
  //   collabCanvasImg: 'https://drive.google.com/uc?id=135G6ScVhaUh0nJmE24HHaRiV326_UJRa',
  //   sharedMedia: null,
  //   chatFunc: false,
  // });

  userOne.save((err) => {
    if (err) throw err;
  });

  // roomOne.save((err) => {
  //   if (err) throw err;
  // });

  // settingsOne.save((err) => {
  //   if (err) throw err;
  // });

});

// Push fake database objects to their respective arrays
router.get("/push-new-data", async (req, res, next) => {
  userOne = await User.findOne({ username: 'kimi' }).exec();
  roomOne = await Room.findOne({ username: `kimi's korner` }).exec();
  settingsOne = await Settings.findOne({ name: 'kimi settings' }).exec();

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