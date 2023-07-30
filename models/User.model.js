  
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Blog = require("./Blog.model");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false },
    emailNotification: { type: Boolean, required: false },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: false },
    tags: { type: String, required: false },
    description: { type: String, required: false },
    bookmark: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    type: { type: String, required: true },
    password: { type: String, required: true },
    register_date: { type: Date, default: Date.now },
    follower: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    following: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Users", userSchema);
 