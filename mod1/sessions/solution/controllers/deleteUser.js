const User = require("../models/user");

module.exports = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send("Please login using /login route");
  }

  User.findOneAndDelete({ username: req.body.username }, (error, doc) => {
    if (!doc) {
      res.status(404).send("Couldn't find user");
    } else {
      res.send("Deleted: " + doc);
    }
  });
};
