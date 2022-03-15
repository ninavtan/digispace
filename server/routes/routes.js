const router = require("express").Router();
// Auth
// const passport = require("passport");
// const jwt = require("jwt-simple");
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const LocalStrategy = require("passport-local").Strategy;
// const JwtStrategy = require("passport-jwt").Strategy;
// const bcrypt = require("bcrypt");


// Models
const Room = require("../models/room.js");
const Settings = require("../models/settings.js");
const User = require("../models/user");
const Image = require("../models/image");
const user = require("../models/user");

// const tokenForUser = function (user) {
//   return jwt.encode(
//     {
//       sub: user.myID,
//       iat: Math.round(Date.now() / 1000),
//       exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
//     },
//     "bananas"
//   );
// };

// passport.use(
//   "login",
//   new LocalStrategy( (username, password, done) => {
//     console.log('This logs first');

//     let authenticated;
  
//     User.findOne({ username: username }, ((err, foundUser) => {
//       if (!foundUser) {
//         console.log('no user found');
//       } else {
//       console.log(foundUser);
//       bcrypt.compare(password, foundUser.password, function(err, isCorrect) {
//         if (err) throw err;
//         if (isCorrect) {
//           authenticated = true;
//           console.log('password decrypting is correct!');
//         } else {
//           !authenticated;
//         }
//         if (authenticated) {
//           console.log("right password!");
//           return done(null, { user: foundUser });
//         } else {
//           console.log('wrong password')
//           return done(null, false);
//         }
//       })
//     }
//   }));
//   })
// );

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: "bananas",
// };


// passport.use(
//   "jwt",
//   new JwtStrategy(jwtOptions, function (payload, done) {
//     return done(null, { myUser: "user", myID: payload.sub });
//   })
// );

// const requireSignin = passport.authenticate("login", { session: false });
// const requireAuth = passport.authenticate("jwt", { session: false });


// router.post("/register", async (req, res) => {
//   const user = req.body;

//   // Check if username or email has been taken by another user
//   const takenUsername = await User.findOne({ username: user.username });
//   const takenEmail = await User.findOne({ email: user.email }); 

//   if (takenUsername || takenEmail) {
//     res.json({message: "Username or email has already been taken"})
//   } else {
//     await bcrypt.hash(user.password, 10, (err, hash) => {
//       if (err) throw err;
//       user.password = hash;
//       const dbUser = new User({
//         username: user.username.toLowerCase(),
//         first_name: '',
//         last_name: '',
//         email: user.email.toLowerCase(),
//         password: user.password,
//         rooms: [],
//         gallery: []
//       });
//       dbUser.save()
//       console.log(user.password);
//       res.json({message: "Success"});
//   });
//   }
// })

// // router.get("/login", function (req, res) {
// //   // This route serves the HTML to the browser
// //   res.sendFile(__dirname + "/login.html");
// // });

// router.post("/api/auth/signin", requireSignin, (req, res, next) => {
//   console.log("Then this logs");
//   res.send({
//     token: tokenForUser(req.user),
//     userInfo: req.user.user
    
//   });
// });

// router.get("/protected", requireAuth, function (req, res) {
//   // This route will be secured to only logged in users eventually
//   res.send("Access Granted!");

// });

// END OF AUTH ROUTES //

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
router.get("/user/:user/rooms", (req, res, next) => {
  const userId = req.params.user;

  let targetUserRooms = [];

  User.findById( userId )
    .populate("rooms")
    .exec((err, targetUser) => {
        if (err) return next(err);
        res.send(targetUser.rooms);
    });
});

// Fetches a specific room
// TODO: Checks if the user has authorization to enter the room
// Needs to work on the backend
router.get("/room/:roomId", (req, res, next) => {

  // Returns the room settings
  // userCreated and roomId are ObjectIds
  Room.findOne({ room: req.params.roomId }).
  populate('roomSettings').
  exec(function (err, room) {
    if (err) return (err);
    // console.log(room);
    // prints "The author is Ian Fleming"
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

// Create a new room
// Working
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

// router.get("/room/:roomId/gallery", (req, res, next) => {
//   const roomId = req.params.roomId;
//   Image.find({ room: roomId}, (err, result) => {
//     res.send(result);
//   })
//   // Room.findById( roomId )
//   // .exec((err, targetRoom) => {
//   //     if (err) return next(err);
//   //     console.log(targetRoom.gallery);
//   //     res.send(targetRoom.gallery);
//   // })
// });

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
  // console.log(newImage);
  res.send(imageForClient);
  
});

router.get("/room/:roomId/gallery", (req, res, next) => {

  let data = {};
  console.log(req.params.roomId);

  const query = { room: req.params.roomId };
  Image.find(query)
    .exec((err, images) => {
      if (err) throw err;
      // Check to see if there are images in db.
      if (images) {
      console.log(`Images is ${images.length} long!`);
      // console.log()
      // console.log(`Images is a ${typeof images}!`);
      // object (allegedly)
      // Loop through images

      
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