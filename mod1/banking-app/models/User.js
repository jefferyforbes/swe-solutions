const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
  },
  balance: {
    type: String,
    default: "0",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
