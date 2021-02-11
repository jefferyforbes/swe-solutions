const User = require("../models/User");

module.exports = (req, res, next) => {
  const amount = parseFloat(req.body.amount);
  const filter = { email: req.body.email };
  const update = { $inc: { balance: amount } };
  const options = { new: true, useFindAndModify: false };

  User.findOneAndUpdate(filter, update, options, (error, doc) => {
    if (!doc) {
      console.log(error.message);
    } else {
      console.log(doc);
    }
  });

  next();
};
