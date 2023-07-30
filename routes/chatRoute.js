const Messages = (socket) => {
    socket.on("newMessages", (data) => {
        console.log(data);
        socket.emit("broadcast" ,data);
    })
} 

const setup = (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData.id);
      socket.emit("connected");
    });
}

module.exports = {
  Messages,
  setup,
};