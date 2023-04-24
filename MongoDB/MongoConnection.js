const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
    const uri = process.env.ATLAS_URI;
    const options = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };
   mongoose.connect("mongodb://localhost:27017/cms_db", options);

    const connection = mongoose.connection;

    connection.once("open", () => {
        console.log("MongoDB database connection is successfully established");
        return connection;
    });
}  
module.exports = connect;