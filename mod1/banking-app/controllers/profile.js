const User = require("../models/User");

module.exports = (req, res) => {
  res.render("profile", {
    user: req.oidc.user,
    loggedIn: req.oidc.isAuthenticated(),
  });
};
