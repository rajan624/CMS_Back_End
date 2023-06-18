const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const middleware = require("./Middleware/verifyAuthentication");
require("dotenv").config();
const app = express();
const path = require("path");

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "Static")));

//routes
const authRouter = require("./routes/authRoute");
const subscriberRoute = require("./routes/subscriberRoute");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
app.use("/api/user", authRouter);
app.use("/api/subscriber", subscriberRoute);
app.use(middleware.Authentication);
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

module.exports = app;
