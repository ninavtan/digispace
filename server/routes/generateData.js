const express = require("express");
const router = require("express").Router();

const Room = require("../models/room.js");
const Settings = require("../models/settings.js");
const User = require("../models/user.js");
const app = express();
const jwt = require("jsonwebtoken");

router.get("/nina", (req, res, next) => {       
  res.json({message: "HI NINA~"});
});

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
    name: `test digispace`,
    user: null,
    roomSettings: null,
    authUsers: [],
    gallery: []
  });

  let settingsOne = new Settings({
    name: `digispace settings`,
    userCreated: null,
    roomId: null,
    collabCanvasFunc: true,
    collabCanvasImg: 'https://drive.google.com/uc?id=135G6ScVhaUh0nJmE24HHaRiV326_UJRa',
    sharedMedia: null,
    chatFunc: false,
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
  userOne = await User.findOne({ username: 'nina' }).exec();
  roomOne = await Room.findOne({ username: `nina's fantasy world 2` }).exec();
  settingsOne = await Settings.findOne({ name: 'fantasy world settings' }).exec();

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