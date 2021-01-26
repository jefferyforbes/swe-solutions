const User = require("../models/user");

module.exports = (req, res) => {
  if (!req.session.userId) {
    return res.send("Please login.");
  }

  User.findOne(
    {
      username: req.body.username,
    },
    (error, user) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Found user: " + user + ". Session ID is: " + req.sessionID);
      }
    }
  );
};
