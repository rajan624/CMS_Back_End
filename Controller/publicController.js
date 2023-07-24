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
        console.log("🚀 ~ file: publicController.js:13 ~ bestStories ~ error:", error)
        logger.error(`Error in Best Stories controller ${error}`)
        res.status(500).json({error:error.messages})
    }

}
const getBlogById = async (req, res) => {
    try { 
        
        console.log('getBlogById Function Start'+req.params.blogId);
      const bestBlog = await Blog.findById(req.params.blogId)
          .populate({
            path: "createdBy",
            select: "-email -register_date -type -password",
          })
          .exec();
        res.status(200).json({ data: bestBlog });
        
    } catch (error) {
        console.log("🚀 ~ file: publicController.js:13 ~ bestStories ~ error:", error)
        logger.error(`Error in Best Stories controller ${error}`)
        res.status(500).json({error:error.messages})
    }

}


module.exports = {
  bestStories,
  getBlogById,
};