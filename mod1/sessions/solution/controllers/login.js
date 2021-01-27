const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          res.send(
            `You're logged in, ${user.username}! Now call other API routes.`
          );
        } else {
          res.send("Sorry, your password was incorrect.");
        }
      });
    } else {
      res.send(`Couldn't find user with username: ${username}`);
    }
  });
};
