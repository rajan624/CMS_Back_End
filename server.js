const app = require("./app");
const connect = require("./MongoDB/MongoConnection");
const port = process.env.PORT || 8000;
connect()
  .then((result) => {
    try {
      app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
      });
    } catch (error) {
      console.log("Can not connect to server");
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("Invalid database connection");
  });
