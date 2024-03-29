const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./User.model");

const blogSchema = new Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    tagLine: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    adminApproval: { type: Boolean, required: true },
    draft: { type: Boolean, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
    htmlData: { type: String, required: false },
    like: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    created_date: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
// Add a static method to the schema for search functionality
blogSchema.statics.search = async function (searchText) {
  const searchRegex = new RegExp(searchText, "i"); // Case-insensitive search
  return this.find({
    $or: [
      { heading: searchRegex },
      { description: searchRegex },
      { tagLine: { $in: [searchRegex] } },
    ],
  })
    .select(
      "-adminApproval -description -htmlData -draft -adminApproval -imageUrl -tagLine -createdBy -like -created_date"
    )
    .limit(10)
    .exec();
};
blogSchema.statics.searchAll = async function (searchText) {
  const searchRegex = new RegExp(searchText, "i"); // Case-insensitive search
  return this.find({
    $or: [
      { heading: searchRegex },
      { description: searchRegex },
      { tagLine: { $in: [searchRegex] } },
    ],
  })
    .populate({
      path: "createdBy",
      select:
        "-email -register_date -type -following -follower -bookmark -password",
    })
    .select("-adminApproval -draft -adminApproval")
    .exec();
};
const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
