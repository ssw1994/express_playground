const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, "firstname is required"] },
  lastname: { type: String, required: [true, "lastname is required"] },
  email: {
    type: String,
    required: true,
    unique: [true, "email is already used"],
  },
  mobile: {
    type: String,
    required: true,
    unique: [true, "mobile is already used"],
  },
  password: { type: String, required: [true, "password is required"] },
});

const userModal = mongoose.model("user", userSchema);
module.exports = { userModal };
