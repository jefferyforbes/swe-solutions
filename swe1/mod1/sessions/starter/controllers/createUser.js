const User = require("../models/user");

module.exports = (req, res) => {
  if (!req.session.userId) {
    return res.send("Please login.");
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user
    .save()
    .then((data) => {
      res.send("Created user: " + data);
    })
    .catch((err) => {
      // if we don't apply a status, then the response will be 200 OK
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
