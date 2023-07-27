const Router = require("express");
const router = Router.Router();
const userController = require("../Controller/userController")


router.get("/profile", userController.getProfile );
router.patch("/profile", userController.updateProfile);
router.get("/myBlog", userController.myBlog);
module.exports = router;


