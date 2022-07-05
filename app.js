const dbcon = require("./model/db.config");
const { saveUser } = require("./model/User");
const User = require("./model/User");
const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user has connected ");
  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });
  socket.on("register", async (user) => {
    try {
      await User.saveUser(user.username, user.password);
    } catch (e) {
      
    }
  });
  socket.on("disconnect", () => console.log("user has been disconnected"));
});
(async () =>
  await dbcon()
    .then(() => console.log("connected"))
    .catch(console.error))();
(async () =>
  console.log(await User.saveUser("ram", "ram").catch(console.error)))();
