const Messages = (socket) => {
    socket.on("newMessages", (data) => {
      console.log("🚀 ~ file: chatRoute.js:3 ~ socket.on ~ data:", data)
      // socket.emit("broadcast", data);


      //  chat.users.forEach((user) => {
      //    if (user._id == newMessageRecieved.sender._id) return;

         socket.in(data.chat).emit("broadcast", data);
      //  });
    });
} 

const setup = (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData.id);
      socket.emit("connected",);
    });
}
const joinChat = (socket) => {
    socket.on("joinChat", (room) => {
      socket.join(room);
      socket.emit("connected");
    });
}

module.exports = {
  Messages,
  setup,
  joinChat,
};