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
    // console.log(response);
    res.send(response);
  })
})

// Get all the :user's rooms
router.get("/user/:email/rooms", (req, res, next) => {
  // Find user ObjectId through email
  const user = User.find({ email: req.params.email });

  let userId;

  User.find({ email: req.params.email })
    .exec((err, targetUser) => {
        if (err) return next(err);
        userId = targetUser._id;
    });

  Room.find({ user: userId })
    .exec((err, rooms) => {
      if (err) return next(err);
      res.send(rooms);
    })
  
  
});

// Fetches a specific room
router.get("/room/:roomId", (req, res, next) => {

  Room.findOne({ room: req.params.roomId }).
  populate('roomSettings').
  exec(function (err, room) {
    if (err) return (err);
  });

  Image.find({ room: req.params.roomId}).
  populate('image').
  exec(function (err, image) {
    if (err) return (err);
    console.log('Here is da image', image);
  })



  // Settings.findById(targetRoomSettings)
  // .exec((err, settings) => {
  //   if (err) console.log('Error while fetching settings', err);
  //   res.send(settings);
  // })

  // Image.find({ room: req.params.roomId })
  // .exec((err, images) => {
  //   res.send(images);
  // })
  // Room.findOne({ _id: req.params.roomId}, (err, result) => {
  //   res.send(result);
  // })
});

// Fetch user info
router.get("/user/:email", (req, res, next) => {

  // Find the target user, or create a new one if it doesn't exist.
  User.findOne({ email: req.params.email })
    .exec((err, targetUser) => {
        if (err) return next(err);

        if (targetUser) {
          console.log(targetUser);
          res.send(targetUser); 
        } else {
          let newUser = new User({
          username: null,
          email: req.params.email
        });
        newUser.save();
        console.log(newUser);
        res.send(newUser);
      };
    });
});



// Create a new room
router.post("/user/:userId/room/new", (req,res,next) => {

  let newRoom = new Room({
    name: req.body.name,
    user: req.params.userId,
    roomSettings: null,
    authUsers: [req.params.userId]
  });

  newRoom.save();
  res.send(newRoom);
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
  // This renders the base64 image successfully.
  // console.log(imageSplit);
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
  
  // let targetUser = User.findOne({ _id: req.params.userId }).then(function(user){
  //   console.log(user);
  //   user.gallery.push(newImage._id);
  //   user.save();
  // });

  let targetRoom = Room.findOne({ _id: req.body.room }).then(function(room){
    console.log(room);
    room.gallery.push(newImage._id);
    room.save();
  });
  res.send(imageForClient);
  
});

router.get("/room/:roomId/gallery", (req, res, next) => {

  let data = {};
  console.log(req.params.roomId);

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