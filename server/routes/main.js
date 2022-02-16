const router = require("express").Router();

const Room = require("../models/room.js");
const Settings = require("../models/settings.js");
const User = require("../models/user.js");



router.get("/nina", (req, res, next) => {       
  res.json({message: "HI NINA~"});
});

// Create new fake data
router.get("/create-new-data", (req, res, next) => {

  let userOne = new User({
    username: 'ninaboots',
    first_name: 'Nina',
    last_name: 'Tan',
    email: 'nunyabusiness@gmail.com',
    rooms: []
  });

  let roomOne = new Room({
    name: `nina's fantasy world`,
    user: null,
    roomSettings: null,
    authUsers: [],
  });

  let settingsOne = new Settings({
    name: 'Fun',
    userCreated: null,
    roomId: null,
    collabCanvasFunc: true,
    collabCanvasImg: 'https://drive.google.com/uc?id=135G6ScVhaUh0nJmE24HHaRiV326_UJRa',
    sharedMedia: null,
    chatFunc: true
  });

  userOne.save((err) => {
    if (err) throw err;
  });

  roomOne.save((err) => {
    if (err) throw err;
  });

  settingsOne.save((err) => {
    if (err) throw err;
  });

});

// Push fake database objects to their respective arrays
router.get("/push-fake-data", async (req, res, next) => {
  userOne = await User.findOne({ username: 'ninaboots' }).exec();
  roomOne = await Room.findOne({ username: `nina's fantasy world` }).exec();
  settingsOne = await Settings.findOne({ name: 'Fun' }).exec();

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

router.get("/boards/:user", (req, res, next) => {
  const userId = req.params.user;

  User.findById( userId )
    .populate("rooms")
    .exec((err, targetUser) => {
        if (err) return next(err);
        res.send(targetUser.rooms);
    });
});




module.exports = router;