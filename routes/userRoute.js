const Router = require("express");
const router = Router.Router();
const userController = require("../Controller/userController")


router.get("/profile", userController.getProfile );
module.exports = router;


