const User = require("../models/user");

module.exports = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send("Please login using /login route");
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
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
