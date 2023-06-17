const Router = require("express");
const router = Router.Router();
const authController = require("../Controller/authController");

router.post("/login", authController.login);
router.post("/registerAuthor", authController.signUp);

module.exports = router;
