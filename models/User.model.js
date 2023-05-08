  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  emailNotification: { type: Boolean, required: false },
  email: { type: String, required: true, unique: true },
  type: { type: String, required: true, },
  password: { type: String, required: false },
  register_date: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);
module.exports = User;