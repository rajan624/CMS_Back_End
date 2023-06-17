const Router = require("express");
const router = Router.Router();
const subscriberController = require("../Controller/subscriberController");


router.post("/registerSubscriber" , subscriberController.newSubscriber);

module.exports = router;
