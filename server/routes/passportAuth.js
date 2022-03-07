const router = require("express").Router();
const passport = require("passport");
const jwt = require("jwt-simple");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;

const tokenForUser = function (user) {
  return jwt.encode(
    {
      sub: user.myID,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    "bananas"
  );
};

passport.use(
  "login",
  new LocalStrategy(function (username, password, done) {
    const authenticated = username === "John" && password === "Smith";

    console.log("This logs first");

    if (authenticated) {
      return done(null, { myUser: "user", myID: 1234 });
    } else {
      return done(null, false);
    }
  })
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "bananas",
};

passport.use(
  "jwt",
  new JwtStrategy(jwtOptions, function (payload, done) {
    return done(null, { myUser: "user", myID: payload.sub });
  })
);

const requireSignin = passport.authenticate("login", { session: false });

const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/login", requireSignin, function (req, res, next) {
  // This is where the login process will happen
  console.log("Then this logs");
  res.send({
    token: tokenForUser(req.user),
  });

});

router.get("/login", function (req, res) {
  // This route serves the HTML to the browser
  res.sendFile(__dirname + "/login.html");
});

router.get("/protected", requireAuth, function (req, res) {
  // This route will be secured to only logged in users eventually
  res.send("Access Granted!");

});

// module.exports = router;