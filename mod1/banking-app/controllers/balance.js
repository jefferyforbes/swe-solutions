const user = require("../models/User");

module.exports = (req, res) => {
  // need to save new balance
  res.send(req.body.amount);
};
