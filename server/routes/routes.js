const router = require("express").Router();

const Room = require("../models/room.js");
const Settings = require("../models/settings.js");
const User = require("../models/user");
const Image = require("../models/image");
const user = require("../models/user");

// Get all of the rooms
router.get("/rooms", (req, res, next) => {
  let rooms = [];
  Room.find({}, (err, response) => {
    if (err) console.log(`Error with fetching all rooms ${err}`);
    res.send(response);
  })
})

// Get all the :user's rooms
router.get("/user/:email/rooms", (req, res, next) => {
  let p = new Promise((resolve, reject)=> {
    let user = User.findOne({ email: req.params.email }).exec();
    if (user) {
      resolve(user)
    } else {
      reject('Failed to find user / user rooms')
    }
  })

  p.then((user) => {
    console.log('This is in the then ' + user)
     Room.find({ user: user._id }).exec((err, rooms) => {
       if (err) return next(err);
       res.send(rooms);
     })
  }).catch((message) => {
    console.log('This is in the catch ' + message);
  })  
});

// Fetches a specific room
router.get("/room/:roomId", (req, res, next) => {

  Room.findOne({ room: req.params.roomId }).
  populate('roomSettings').
  exec(function (err) {
    if (err) return (err);
  });

  Image.find({ room: req.params.roomId }).
  populate('image').
  exec(function (err) {
    if (err) return (err);
  })
});

// Fetch specific room settings
router.get("/room/:roomId/settings", (req, res, next) => {
  Settings.find({ roomId: req.params.roomId }).exec((err, settings) => {
    if (err) next(err);
    res.send(settings);
  })
});

// Fetch user info
router.get("/user/:email", (req, res, next) => {

  // Find the target user, or create a new one if it doesn't exist.
  User.findOne({ email: req.params.email })
    .exec((err, targetUser) => {
        if (err) return next(err);

        if (targetUser) {
          res.send(targetUser); 
        } else {
          let newUser = new User({
          username: null,
          email: req.params.email
        });
        newUser.save();
        res.send(newUser);
      };
    });
});



// Create a new room
router.post("/user/:email/room/new", (req, res, next) => {

  let p = new Promise((resolve, reject)=> {
    let user = User.findOne({ email: req.params.email }).exec();
    if (user) {
      resolve(user)
    } else {
      reject('Failed')
    }
  })

  p.then((user) => {
    console.log('This is in the then ' + user)
    console.log(req.body);
      let newRoomSettings = new Settings({
       name: `${req.body.name} Settings`,
       userCreated: user._id,
       roomId: null,
       collabCanvasFunc: req.body.canvas,
       galleryFunc: req.body.gallery,
       chatFunc: req.body.chat
      })
      newRoomSettings.save();

      let newRoom = new Room({
      name: req.body.name,
      user: user._id,
      roomSettings: newRoomSettings._id,
      authUsers: [req.params.email]
    })
      newRoom.save();
      newRoomSettings.roomId = newRoom._id;
      user.rooms.push(newRoom._id);
      user.save();

  }).catch((message) => {
    console.log('This is in the catch ' + message);
  })
});

// Update the settings of a room
router.put("/user/:userId/room/:roomId", (req, res, next) => {
  console.log(req.body);
});

router.post("/room/:roomId/gallery", async (req, res, next) => {
  // console.log(`params: ${req.params.roomId}`);
  console.log(req.body.room);
  // Turns req.body into a string
  const string = JSON.stringify(req.body.image);
  // Replaces white spaces with +
  const image = string.replace(/\s/g, "+");
  // Gets rid of the "" we don't need
  const imageSplit = (image.split('"')[1]);
  // This gets rid of the data:image/png;base64,
  var base64result = imageSplit.split(',')[1];

  const buffer = Buffer.from(base64result, 'base64');


  let newImage = new Image({
    name: req.body.name,
    desc: req.body.desc,
    user: req.body.artist,
    room: req.body.room,
    img: {
      data: buffer,
      contentType: 'image/png'
    }
  
  });
  newImage.save();

  let imageForClient = {
    user: req.body.artist,
    img: base64result
  }
  
  let targetRoom = Room.findOne({ _id: req.body.room }).then(function(room){
    room.gallery.push(newImage._id);
    room.save();
  });
  res.send(imageForClient);
  
});

router.get("/room/:roomId/gallery", (req, res, next) => {

  let data = {};

  const query = { room: req.params.roomId };
  Image.find(query)
    .exec((err, images) => {
      if (err) throw err;
      if (images) {
      console.log(`Images is ${images.length} long!`);

      data = images.map((image) => (
        {
          id: image._id,
          image: Buffer.from(image.img.data, 'binary').toString('base64').replace(/'/g, ""),
          user: image.user
        }

      ));
      console.log(data);
      // data is objects within an array
      res.send(data); 
      // If there are no images in db, return null
      } else {
        res.send('null');
      }
    })
});

module.exports = router;