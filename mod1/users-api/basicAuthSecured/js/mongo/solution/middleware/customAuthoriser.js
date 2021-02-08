const User = require("../models/user");
const bcrypt = require("bcrypt");

// basic auth passes username/password along - cb is also from basic auth
customAuthoriser = async (baUsername, baPassword, cb) => {
  // get the user
  var foundUser = await getUser(baUsername);

  if (!foundUser) return cb(null, false);

  // if we've found a user, compare passwords
  bcrypt.compare(baPassword, foundUser.password, function (err, result) {
    return cb(null, result);
  });
};

getUser = async (baUsername) => {
  // get the user from mongo
  const user = await User.findOne({ username: baUsername }, (error) => {
    if (error) {
      console.log(error);
    }
  });

  return user;
};

module.exports = customAuthoriser;
