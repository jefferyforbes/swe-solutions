const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// before we save a record...
UserSchema.pre("save", function (next) {
  // get the current user
  const user = this;

  // hash the password
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) {
      console.log(error);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
