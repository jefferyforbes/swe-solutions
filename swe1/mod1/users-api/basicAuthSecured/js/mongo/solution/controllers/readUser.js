const User = require("../models/user");

module.exports = (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (error, user) => {
      if (!user) {
        res.status(404).send("Couldn't find user.");
      } else {
        res.status(200).send("Found user: " + user);
      }
    }
  );
};
