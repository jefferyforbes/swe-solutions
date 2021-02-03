const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          res
            .status(200)
            .send(
              `You're logged in, ${user.username}! Now call other API routes.`
            );
        } else {
          res.status(401).send("Sorry, your password was incorrect.");
        }
      });
    } else {
      res.status(404).send(`Couldn't find user with username: ${username}`);
    }
  });
};
