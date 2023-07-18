const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// tell passport to use a new strategy for google login
passport.use(
  new googleStrategy(
    {
      clientID:
        "328982532566-ke0s2gap820og2po1ftqkjhr2hbheb7i.apps.googleusercontent.com", // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
      clientSecret: "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", // e.g. _ASDFA%KFJWIASDFASD#FAD-
      callbackURL: "https://cms-web-app-07.web.app/api/user/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      //   find a user
      console.log("gdddfg");
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        // if found, set this user as req.user
        return done(null, user);
      } else {
        // if not found, create the user and set it as req.user
        const password = crypto.randomBytes(20).toString("hex");
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error("Something went wrong with bcrypt");

        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0]?.value,
          profileImage: profile.photos[0]?.value,
          password: hash,
          type: "Author",
        });

        const savedUser = await newUser.save();
        if (!savedUser) {
          console.log("error in creating user google strategy-passport", err);
          return;
        }

        return done(null, savedUser);
      }
    }
  )
);


passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.name, usremail: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not signed in
  return res.redirect("/login");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }

  next();
};



module.exports = passport;
