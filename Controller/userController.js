const User = require("../models/User.model");
const DEBUG = process.env.DEBUG;
const logger = require("../Config/Logger")
const Blog = require("../models/Blog.model");

const getProfile = async (req, res) => {
  const userId = req.user.id;
  // Retrieve user profile data from the database using the user ID
  if (DEBUG) {
    console.log("Get Profile Function Start");
  }
  try {
    const userProfile = await User.findById(userId).select(
      "-type  -password -register_date"
    );
    res.json({ profile: userProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};


const updateProfile = async (req, res) => {
  const userId = req.user.id;
  // Retrieve user profile data from the database using the user ID
  if (DEBUG) {
    console.log("Get Profile Function Start");
  }
  try {
    const userProfile = await User.findById(userId).select(
      "-type  -password -register_date"
    );
    if (req.user.id != userProfile._id) {
      return res.status(403).json({msg:"Unauthorized Access"})
    }
    userProfile.name = req?.body?.name;
    userProfile.tags = req?.body?.tags;
    userProfile.description = req?.body?.description;
    userProfile.save();
    res.json({ profile: userProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const myBlog = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the parameter is passed as a query parameter (e.g., /bestStories?userId=123)
    console.log("🚀 ~ file: userController.js:51 ~ myBlog ~ userId:", userId)

    // Check if the user ID parameter exists and is a valid MongoDB ObjectId

    const bestBlog = await Blog.find({ createdBy: userId })
      .sort({ like: -1 })
      .select("imageUrl heading description _id tagLine -createdBy")
      .populate({
        path: "createdBy",
        select: "-email -register_date -type -password",
      })
      .exec();

    res.status(200).json({ data: bestBlog });
  } catch (error) {
    console.log(`Error in Best Stories controller ${error}`);
    res.status(500).json({ error: `${error}` });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  myBlog,
};
