
const DEBUG = process.env.DEBUG;
const Blog = require("../models/Blog.model")
const createBlog = async (req, res) => {
    try {        
      const formData = req.body;
      const protocol = req.protocol; // 'http' or 'https'
      const domain = req.get("host"); // Get the domain from the request headers
      const fullURL = `${protocol}://${domain}`;
        const imageUrl = fullURL+"/"+req.file.path; 
        if (DEBUG) {
            console.log("Form Data ", formData);
            console.log("Image Data ", imageUrl);
        }
       // Create a new blog object using the form data and the image URL
      const tagLine = JSON.parse(formData.tagline);
         const newBlog = new Blog({
           description: formData.description,
           heading: formData.heading,
           tagLine: tagLine,
           htmlData: formData.html,
           imageUrl: imageUrl, // Store the image URL in the new blog object
           adminApproval: false,
           draft: formData.draft,
           createdBy: req.user.id,
         });
          console.log("🚀 ~ file: blogController.js:23 ~ createBlog ~ req:", req.user.id)
       // Save the new blog object to MongoDB using Mongoose
       const savedBlog = await newBlog.save();
       res.status(200).json(savedBlog);
    } catch (error) {
        if (DEBUG) {
            console.log("Error", error);
        }
          res.status(500).json({ error: error.message });
    }
}
const uploadBlogImage = async (req, res) => {
  try { 
      const protocol = req.protocol; // 'http' or 'https'
      const domain = req.get("host"); // Get the domain from the request headers
      const fullURL = `${protocol}://${domain}`;
        const imageUrl = fullURL+"/"+req?.file?.path; 
        if (DEBUG) {
            console.log("Image Data ", imageUrl);
      }
      
      const data = {
        imageUrl:imageUrl
      }
       res.status(200).json(data);
    } catch (error) {
        if (DEBUG) {
            console.log("Error", error);
        }
          res.status(500).json({ error: error.message });
    }
}


module.exports = {
  createBlog,
  uploadBlogImage
}