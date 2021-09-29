const express = require("express");
const oidcConfig = require("./config");
const ejs = require("ejs");
const { auth, requiresAuth } = require("express-openid-connect");

// init express
const app = new express();

// set ejs as view engine
app.set("view engine", "ejs");

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(oidcConfig));

// protected profile route
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/", (req, res) => {
  res.render("index", { loggedIn: req.oidc.isAuthenticated() });
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
