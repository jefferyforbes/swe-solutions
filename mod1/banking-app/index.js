const express = require("express");
const oidcConfig = require("./config");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { auth, requiresAuth } = require("express-openid-connect");

// controllers
const profileController = require("./controllers/profile");
const homeController = require("./controllers/home");
const balanceController = require("./controllers/balance");

//middleware
const addUser = require("./middleware/addUser");

// init express
const app = new express();

// parse req.body
app.use(bodyParser.urlencoded());

// use json
app.use(
  express.json({
    extended: true,
  })
);

// set ejs as view engine
app.set("view engine", "ejs");

// use static path for assets
app.use(express.static("public"));

// auth router attaches /login, /logout, and /callback routes
app.use(auth(oidcConfig));

// connect to mongo
mongoose.connect(
  "mongodb://localhost/banking-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to MongoDB");
  }
);

// profile route
app.get("/profile", requiresAuth(), addUser, profileController);

// add balance
app.post("/balance", requiresAuth(), balanceController);

// index route
app.get("/", homeController);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
