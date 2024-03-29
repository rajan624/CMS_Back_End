const Router  = require("express");
const { route } = require("./authRoute");
const router = Router.Router();
const publicController = require("../Controller/publicController");

router.get("/bestStories", publicController.bestStories);
router.get("/bestAuthorStories", publicController.bestAuthorStories);
router.get("/recommendedStories", publicController.recommendedStories);
router.get("/search", publicController.search);
router.get("/:blogId", publicController.getBlogById);
router.get("/getSuggestion/:searchText", publicController.getSuggestion);
router.get("/search/:searchText", publicController.getSearch);


module.exports = router;