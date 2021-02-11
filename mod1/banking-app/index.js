const express = require("express");
const oidcConfig = require("./config");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { auth, requiresAuth } = require("express-openid-connect");

// controllers
const profileController = require("./controllers/profile");
const homeController = require("./controllers/home");

// init express
const app = new express();

// set ejs as view engine
app.set("view engine", "ejs");

// use static path for assets
app.use(express.static("public"));

// auth router attaches /login, /logout, and /callback routes to the baseURL
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

// protected profile route
app.get("/profile", requiresAuth(), profileController);

app.get("/", homeController);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
