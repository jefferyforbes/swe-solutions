const User = require("../models/user");
const bcrypt = require("bcrypt");

// basic auth passes username/password along - cb is also from basic auth
customAuthoriser = async (basicAuthUsername, basicAuthPassword, cb) => {};

getUser = (basicAuthUsername) => {};

checkUserPassword = async (basicAuthPassword, foundUser) => {};

module.exports = customAuthoriser;
