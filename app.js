const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log("user has connected ");
  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });
  socket.on("disconnect", () => console.log("user has been disconnected"));
});
http.listen(3000, () => console.log("server's up at 3000"));
