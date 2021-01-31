const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const routes = require("./routes");
const config = require("./config");

// set view engine to ejs
app.set("view engine", "ejs");

// init express session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET123!",
  })
);

// init passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// saves user info to session
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

// fetches user info from session
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// init passport strategy using config deets
passport.use(
  new LinkedInStrategy(
    {
      clientID: config.linkedinAuth.clientID,
      clientSecret: config.linkedinAuth.clientSecret,
      callbackURL: config.linkedinAuth.callbackURL,
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    function (token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  )
);

// use routes file for all routes
app.use("/", routes);

// use port 3xxx
const port = 3000;

app.listen(port, () => {
  console.log("App listening on port " + port);
});
