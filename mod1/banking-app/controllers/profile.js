const User = require("../models/User");

module.exports = (req, res) => {
  // get balance etc here and pass on to view
  res.render("profile", {
    user: req.oidc.user,
    loggedIn: req.oidc.isAuthenticated(),
  });
};
