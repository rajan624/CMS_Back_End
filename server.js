require("dotenv").config({ path: `.env.production` });
const app = require("./app");
const connect = require("./MongoDB/MongoConnection");
const port = process.env.PORT || 4000;
const DEBUG = process.env.DEBUG;
const socket = require("socket.io");
const { Messages, setup, joinChat, typing } = require("./routes/chatRoute");

connect()
  .then((result) => {
    try {
      const server = app.listen(port, () => {
        if (DEBUG) {
          console.log(`Server is running on port: ${port}`);
        }
      });
      const io = socket(server, {
        pingTimeout: 60000,
        cors: {
          origin: "https://cms-web-app-07.web.app",
          // credentials: true,
        },
      });

      io.on("connection", (socket) => {
        setup(socket);
        Messages(socket);
        joinChat(socket);
        typing(socket);
      });
    } catch (error) {
      if (DEBUG) {
        console.log("Can not connect to server");
      }
    }
  })
  .catch((err) => {
    if (DEBUG) {
      console.log(err);
      console.log("Invalid database connection");
    }
  });
