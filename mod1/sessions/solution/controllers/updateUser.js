const User = require("../models/user");

module.exports = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send("Please login using /login route");
  }

  const filter = { username: req.body.username };
  const update = { username: req.body.new_username };

  // new specifies to send us the one we've just added
  User.findOneAndUpdate(filter, update, { new: true }, (error, doc) => {
    if (!doc) {
      res.status(404).send("Couldn't find user");
    } else {
      res.status(200).send("User updated: " + doc);
    }
  });
};
