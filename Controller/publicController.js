const logger = require("../Config/Logger");
const Blog = require("../models/Blog.model")
const bestStories = async (req, res) => {
    try {
        logger.log('bestStories Function Start');
        const bestBlog = await Blog.find().sort({ like: -1 }).limit(10);
        res.status(200).json({ data: bestBlog });
        
    } catch (error) {
        logger.error(`Error in Best Stories controller ${error}`)
        res.status(500).json({error:error.messages})
    }

}


module.exports = {
    bestStories
}