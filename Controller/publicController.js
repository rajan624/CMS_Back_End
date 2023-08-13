const { serializeUser } = require("passport");
const logger = require("../Config/Logger");
const Blog = require("../models/Blog.model")
const bestStories = async (req, res) => {
    try { 
        
        logger.log('bestStories Function Start');
        const bestBlog = await Blog.find()
          .sort({ like: -1 })
          .limit(10)
          .select("imageUrl heading description _id tagLine")
          .populate({
            path: "createdBy",
            select: "-email -register_date -type -password",
          })
          .exec();
        res.status(200).json({ data: bestBlog });
        
    } catch (error) {
        logger.error(`Error in Best Stories controller ${error}`)
        res.status(500).json({error:error.messages})
    }

}
const bestAuthorStories = async (req, res) => {
    try { 
      const offset = req.query.offset || 0;
        logger.log('bestStories Function Start');
        const bestBlog = await Blog.find()
          .sort({ createdBy: -1 })
          .skip(offset)
          .limit(12)
          .select("imageUrl heading description _id tagLine")
          .populate({
            path: "createdBy",
            select: "-email -register_date -type -password",
          })
          .exec();
        res.status(200).json({ data: bestBlog });
        
    } catch (error) {
        logger.error(`Error in Best Stories controller ${error}`)
        res.status(500).json({error:error.messages})
    }
}
const recommendedStories = async (req, res) => {
  try {
    logger.log("bestStories Function Start");
    const bestBlog = await Blog.find()
      .sort({ like: -1 })
      .limit(12)
      .select("imageUrl heading description _id tagLine")
      .populate({
        path: "createdBy",
        select: "-email -register_date -type -password",
      })
      .exec();
    res.status(200).json({ data: bestBlog });
  } catch (error) {
    logger.error(`Error in Best Stories controller ${error}`);
    res.status(500).json({ error: error.messages });
  }
};
const getBlogById = async (req, res) => {
    try { 
        
        console.log('getBlogById Function Start'+req.params.blogId);
      let bestBlog = await Blog.findById(req.params.blogId)
          .populate({
            path: "createdBy",
            select: "-email -register_date -type -password",
          })
        .exec();
      bestBlog = bestBlog.toObject();
      bestBlog.like = bestBlog.like.length;
        res.status(200).json({ data: bestBlog });
        
    } catch (error) {
        console.log("🚀 ~ file: publicController.js:13 ~ bestStories ~ error:", error)
        logger.error(`Error in Best Stories controller ${error}`)
        res.status(500).json({error:error.messages})
    }

}


const search = async(req, res) => {
  const searchText = req?.query?.search; // Replace with the actual search text
  try {
    const searchResult = await Blog.search(searchText);
    console.log(searchResult);
    return res.status(200).json({ data: searchResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Internal Server Error"})
  }
};

module.exports = {
  bestStories,
  getBlogById,
  bestAuthorStories,
  recommendedStories,
  search,
};