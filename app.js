const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const middleware = require("./Middleware/verifyAuthentication");
require("dotenv").config();
const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
const authRouter = require("./routes/authRoute");
const subscriberRoute = require("./routes/subscriberRoute");
const userRoute = require("./routes/userRoute");
app.use("/api/user", authRouter);
app.use("/api/subscriber", subscriberRoute)
app.use(middleware.Authentication);
app.use("/api/user",userRoute)

module.exports = app;