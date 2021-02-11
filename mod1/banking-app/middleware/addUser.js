const User = require("../models/User");

module.exports = (req, res, next) => {
  User.find(
    {
      email: req.oidc.user.email,
    },
    (error, user) => {
      if (error)
        return res.status(500).send("Sorry, but there's been an error.");

      if (user.length === 0) {
        User.create({
          email: req.oidc.user.email,
        });
      }
    }
  );

  next();
};
