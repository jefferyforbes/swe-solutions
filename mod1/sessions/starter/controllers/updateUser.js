const User = require("../models/user");

module.exports = (req, res) => {
  if (!req.session.userId) {
    return res.send("Please login.");
  }

  const filter = { username: req.body.username };
  const update = { username: req.body.new_username };

  // new specifies to send us the one we've just added
  User.findOneAndUpdate(filter, update, { new: true }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      res.send("User updated: " + doc);
    }
  });
};
