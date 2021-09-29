const { createIndexes } = require("../models/user");
const User = require("../models/user");

module.exports = (req, res) => {
  User.findOneAndDelete({ username: req.body.username }, (error, doc) => {
    if (!doc) {
      res.status(404).send("Couldn't find user");
    } else {
      res.send("Deleted: " + doc);
    }
  });
};
