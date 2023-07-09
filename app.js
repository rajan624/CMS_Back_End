const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use("/api/user", authRouter);
app.use("/api/subscriber", subscriberRoute);
app.use(middleware.Authentication);
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);



module.exports = app;
