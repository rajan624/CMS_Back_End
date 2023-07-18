  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: false },
  emailNotification: { type: Boolean, required: false },
  email: { type: String, required: true, unique: true },
  profileImage:{type:String , required:false },
  type: { type: String, required: true, },
  password: { type: String, required: true },
  register_date: { type: Date, default: Date.now },
  
}, { versionKey: false });

module.exports = mongoose.model("Users", userSchema);
 