const User = require("../models/User");

module.exports = (req, res, next) => {
  console.log(JSON.stringify(req.oidc.user));

  User.findOne(
    {
      email: req.oidc.user.email,
    },
    (error, user) => {
      if (error) console.log(error.message);

      if (!user) {
        User.create({
          email: req.oidc.user.email,
          givenName: req.oidc.user.given_name,
        });
      }
    }
  );

  next();
};
