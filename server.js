const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const connect = require("./MongoDB/MongoConnection");
const passport = require("passport");
const session = require("express-session");
const config = require("./config");
require("dotenv").config();
// app.js or index.js

const app = express();
const port = process.env.PORT || 8000;

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
const contactRouter = require("./routes/contact");
const messageRouter = require("./routes/message");
const userRouter = require("./routes/users");

app.use("/api/contact", contactRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

// Set up session middleware
app.use(session({
  secret: 'YOUR_SESSION_SECRET',
  resave: false,
  saveUninitialized: false
}));

// Set up Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up Google OAuth 2.0 routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Redirect to frontend or send response as needed
  res.redirect('/dashboard');
});


connect()
  .then((result) => {
    try {
      app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
      });
    } catch (error) {
      console.log("Can not connect to server");
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("Invalid database connection");
  });
