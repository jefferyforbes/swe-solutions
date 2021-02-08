const User = require("../models/user");

module.exports = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user
    .save()
    .then((data) => {
      res.status(200).send("Created user: " + data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the User.",
      });
    });
};
