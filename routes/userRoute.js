const Router = require("express");
const router = Router.Router();
const userController = require("../Controller/userController")


router.get("/profile", userController.getProfile );
router.get("/profile/:id", userController.getProfileById );
router.patch("/profile", userController.updateProfile);
router.get("/myBlog", userController.myBlog);
router.get("/likeMyBlog/:id", userController.likeMyBlog);
router.get("/bookmarkMyBlog/:id", userController.BookMarkMyBlog);
router.get("/startChart/:id", userController.startChat);
router.get("/fetchChats", userController.fetchChats);
router.get("/followUser/:id", userController.followUser);
module.exports = router;


