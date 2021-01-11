const User = require("../models/user");

module.exports = (req, res) => {
  User.findOneAndDelete({ username: req.body.username }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      res.send("Deleted: " + doc);
    }
  });
};
