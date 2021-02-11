const User = require("../models/User");

module.exports = (req, res, next) => {
  User.find(
    {
      email: req.oidc.user.email,
    },
    (error, user) => {
      if (error) console.log(error.message);

      if (user.length === 0) {
        User.create({
          email: req.oidc.user.email,
        });
      }
    }
  );

  next();
};
