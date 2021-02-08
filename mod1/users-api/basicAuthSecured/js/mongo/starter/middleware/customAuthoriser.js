const User = require("../models/user");
const bcrypt = require("bcrypt");

// basic auth passes username/password along - cb is also from basic auth
customAuthoriser = async (basicAuthUsername, basicAuthPassword, cb) => {
  var foundUser = await getUser(basicAuthUsername);

  if (foundUser) {
    var authenticateUser = await checkUserPassword(
      basicAuthPassword,
      foundUser
    );

    if (authenticateUser) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  }

  return cb(null, false);
};

getUser = (basicAuthUsername) => {
  // get the user from mongo
  user = User.findOne({ username: basicAuthUsername }, (error) => {
    if (error) {
      console.log(error);
    }
  });

  return user;
};

checkUserPassword = async (basicAuthPassword, foundUser) => {
  var match = await bcrypt.compare(basicAuthPassword, foundUser.password);
  return match ? true : false;
};

module.exports = customAuthoriser;
