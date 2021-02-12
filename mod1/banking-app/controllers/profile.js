const User = require("../models/User");

module.exports = (req, res) => {
  User.findOne(
    {
      email: req.oidc.user.email,
    },
    (error, user) => {
      if (error) console.log(error.message);

      res.render("profile", {
        user: user,
        loggedIn: req.oidc.isAuthenticated(),
      });
    }
  );
};
