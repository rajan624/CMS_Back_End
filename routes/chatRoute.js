const Chat = require("../models/Chat.Model");
const Message = require("../models/Message.Model")
const Messages = (socket) => {
    socket.on("newMessages", (data) => {
      // socket.emit("broadcast", data);
      //  chat.users.forEach((user) => {
      //    if (user._id == newMessageRecieved.sender._id) return;
      socket.in(data.chat).emit("broadcast", data);
    saveChat(data)
      //  });
    });
}

const saveChat = async (data) => {
    const newMessage = new Message({
      sender: data.sender,
      content: data.content,
      chat: data.chat,
    });

  const savedMessage = await newMessage.save();
const updatedChat = await Chat.findByIdAndUpdate(
  data.chat,
  { latestMessage: savedMessage._id },{ new: true }
);
  
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
const typing = (socket) => {
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
    console.log("typing start")
  })
  socket.on("stopTyping", (room) => {
    socket.in(room).emit("stopTyping"); console.log("typing stop")
  })
}
module.exports = {
  Messages,
  setup,
  joinChat,
  typing,
};