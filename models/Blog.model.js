const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  tagLine: { type: String, required: true },
  imageUrl: { type: String, required: true },
  adminApproval: { type: Boolean, required: true },
  draft: { type: Boolean, required: true },
  userId: { type: String, required: true },
  htmlData: { type: String, required: false },
  like: { type: Number, required: false },
  created_date: { type: Date, default: Date.now },
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
