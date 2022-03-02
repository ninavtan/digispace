const router = require("express").Router();
// Auth
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie = require('cookie');


// Models
const Room = require("../models/room.js");
const Settings = require("../models/settings.js");
const User = require("../models/user");
const Image = require("../models/image");


router.get('/', function(req, res) {
  res.send('HI!');
});

router.post("/register", async (req, res) => {
  const user = req.body;

  // Check if username or email has been taken by another user
  const takenUsername = await User.findOne({ username: user.username });
  const takenEmail = await User.findOne({ email: user.email }); 

  if (takenUsername || takenEmail) {
    res.json({message: "Username or email has already been taken"})
  } else {
    await bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      const dbUser = new User({
        username: user.username.toLowerCase(),
        first_name: '',
        last_name: '',
        email: user.email.toLowerCase(),
        password: user.password,
        rooms: [],
        gallery: []
      });
      dbUser.save()
      console.log(user.password);
      res.json({message: "Success"});
  });
  }
})

router.post("/login", (req, res) => {
  const userLoggingIn = req.body;

  User.findOne({username: userLoggingIn.username})
  .then(dbUser => {
    if (!dbUser) {
      return res.json({
        message: "Invalid username or password"
      })
    }
    bcrypt.compare(userLoggingIn.password, dbUser.password, function(err, isCorrect){
      if (err) throw err;
      console.log(dbUser);
      if (isCorrect) {
        const data = {
          id: dbUser._id,
          username: dbUser.username,
          first_name: dbUser.first_name,
          last_name: dbUser.last_name,
          rooms: dbUser.rooms
        }
        console.log(data);
        jwt.sign(
          data,
          "process.env.JWT_SECRET",
          {expiresIn: 86400},
          (err, token) => {
            if (err) return res.json({message: 'There was an error with creating a jwt token', err})
            // cookie
            console.log(token);
            res.setHeader('Set-Cookie', cookie.serialize("token", token, {
              path: "/",
              sameSite: true,
              httpOnly: true,
              secure: true,
              maxAge: 60*60*24 //24 hours
            } ))


            // res.setHeader('Authorization', 'Bearer' + token);
            // console.log('Just made token: ', token);
            return res.json({
              data, token
            })
          }
        )
      } else {
        return res.json({
          message: "Invalid username or password"
        })
      }       
    })
  })
})

function verifySession(req, res, next) {
  let message = "";
    headerToken = req.headers['authorization'];
    cookieToken = req.cookies['token'];
    success = headerToken || cookieToken ? true : false;
    if (success) {
        message += "Authorized! Server got token(s):"
        if (cookieToken) {
            message += `\nVia cookie: ${cookieToken}`
        }
        if (headerToken) {
            message += `\nVia header: ${headerToken}`
        }
        res.send(message)
        next();
    } else {
        res.send("Unauthorized! Server didn't get any tokens!")
    }
}

// Middleware function to verify a user -> will be placed before every route we want to protect
function verifyJWT(req, res, next) {
  const token = req.cookies["token"]?.split(' ')[1];
  if (token) {
    console.log('There is a token and it is: ', token);
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

router.get("/getUsername", verifyJWT, (req, res) => {
  res.json({isLoggedIn: true, username: req.user.username})
});

router.get("/isUserAuth", verifyJWT, (req, res) => {
  return res.json({isLoggedIn:true, username: req.user.username})
})

// END OF AUTH ROUTES //

// Get all the :user's rooms
router.get("/user/:user/rooms", (req, res, next) => {
  const userId = req.params.user;

  let targetUserRooms = [];
  User.findById( userId )
    .populate("rooms")
    .exec((err, targetUser) => {
        if (err) return next(err);
        targetUserRooms.push(targetUser.rooms);
        res.send(targetUserRooms);
    });
});

// Fetches a specific room
// TODO: Checks if the user has authorization to enter the room
// Needs to work on the backend
router.get("/user/:userId/room/:roomId", (req, res, next) => {
  const userId = req.params.userId;

  let authUsersList = [];
  let targetRoomSettings;

  Room.findById(req.params.roomId)
  .populate("roomSettings")
  .exec((err, roomSettings) => {
    console.log(roomSettings);
    targetRoomSettings = roomSettings
  })

  Room.findById( req.params.roomId )
    .populate("authUsers")
    .exec((err, room) => {
      if (err) throw err;
      // check if userId is in authUsersList which is in Room
      authUsersList = room.authUsers;
      console.log('This is the authUserList', authUsersList);
      // if authUserList contains userId, allow the user to enter
      authUsersList.map((p) => {
        if (p._id == userId) {
          res.status(200).send(targetRoomSettings);
        } else {
          res.status(401).send('You are unauthorized to view this room.');
        }
      });
    })
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

router.get("/room/:roomId/gallery", (req, res, next) => {
  const roomId = req.params.roomId;
  Room.findById( roomId )
  .exec((err, targetRoom) => {
      if (err) return next(err);
      console.log(targetRoom.gallery);
      res.send(targetRoom.gallery);
  })
});

router.post("/user/:userId/room/:roomId/gallery", async (req, res, next) => {
  // Turns req.body into a string
  const string = JSON.stringify(req.body);
  // Replaces white spaces with +
  const image = string.replace(/\s/g, "+");
  // Gets rid of the "" we don't need
  const imageSplit = (image.split('"')[1]);
  // This renders the base64 image successfully.
  console.log(imageSplit);
  // This gets rid of the data:image/png;base64,
  var base64result = imageSplit.split(',')[1];

  const buffer = Buffer.from(base64result, 'base64');

  let newImage = new Image({
    name: req.body.name,
    desc: req.body.desc,
    user: req.params.userId,
    room: req.params.roomId,
    img: {
      data: buffer,
      contentType: 'image/png'
    }
  
  });
  newImage.save();
  
  let targetUser = User.findOne({ _id: req.params.userId }).then(function(user){
    console.log(user);
    user.gallery.push(newImage._id);
    user.save();
  });

  let targetRoom = Room.findOne({ _id: req.params.roomId }).then(function(room){
    console.log(room);
    room.gallery.push(newImage._id);
    room.save();
  });
  
});

router.get("/user/:userId/room/:roomId/gallery", (req, res, next) => {

  let data;

  const query = { room: req.params.roomId };
  Image.find(query)
    .exec((err, images) => {
      // Check to see if there are images in db.
      if (images.length > 0) {
      // Hardcode first image for development
      data = images[0].img.data;

      // Convert binary Buffer back to base64
      data = Buffer.from(images[0].img.data, 'binary').toString('base64');

      // Response (below) gives an error 413 on client side.
      // res.send(`<img alt="img" src=${data}></img>`);
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': data.length
      });
      res.end(data); 
      // If there are no images in db, return null
      } else {
        res.send('null');
      }
    })
});

module.exports = router;