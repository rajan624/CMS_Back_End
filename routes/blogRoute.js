const Router = require("express");
const router = Router.Router();
const blogController = require("../Controller/blogController");
const upload = require("../Middleware/uploadImageMiddleware")

router.post("/createBlog", upload.single("file") ,  blogController.createBlog);
router.post("/uploadBlogImage", upload.single("file") ,  blogController.uploadBlogImage);
module.exports = router;
