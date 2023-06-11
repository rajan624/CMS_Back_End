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
const userRouter = require("./routes/users");

app.use(middleware.Authentication);
app.use("/api/user", userRouter);

module.exports = app;