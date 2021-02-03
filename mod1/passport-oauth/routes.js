const passport = require("passport");
const express = require("express");
var router = express.Router();

// load index file for / route
router.get("/", function (req, res) {
  res.render("pages/index.ejs");
});

// render profile page and pass user object from session
router.get("/profile", isLoggedIn, function (req, res) {
  res.render("pages/profile.ejs", {
    user: req.user,
  });
});

// make login request to linkedin via passport
router.get("/auth/linkedin", passport.authenticate("linkedin"));

// passport checks returned linkedin obj
router.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

// terminates the session
router.get("/logout", function (req, res) {
  // logout is passport function
  req.logout();
  res.redirect("/");
});

// middleware function to check if logged in
function isLoggedIn(req, res, next) {
  // isAuthenticated is a passport function
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
