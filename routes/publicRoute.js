const Router  = require("express");
const { route } = require("./authRoute");
const router = Router.Router();
const publicController = require("../Controller/publicController");

router.get("/bestStories", publicController.bestStories);

router.get("/:blogId", publicController.getBlogById);


module.exports = router;