const User = require("../models/user");

module.exports = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send("Please login using /login route");
  }

  User.findOne(
    {
      username: req.body.username,
    },
    (error, user) => {
      if (!user) {
        return res.status(404).send("Couldn't find user");
      }
      res
        .status(200)
        .send("Found user: " + user + ". Session ID is: " + req.sessionID);
    }
  );
};
