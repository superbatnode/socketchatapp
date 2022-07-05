var socket = io();
let username = undefined;
do {
  username = prompt("Input your username");
} while (!username);

const form = document.querySelector("#form");
const chat = document.querySelector("#chat");
document.querySelector("#username").innerText = username;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (chat.value) {
    const data = {
      message: chat.value.toString().trim(),
      user: username,
    };
    socket.emit("chat", data);
    chat.value = "";
  }
});
const chats = document.querySelector("#all_chats");
socket.on("chat", (chat) => {
  const mainDiv = document.createElement("div");
  mainDiv.classList = chat.user === username ? "out-msg" : "inc-msg";
  const heading = document.createElement("h");
  heading.classList = "chat-head";
  heading.innerText = chat.user;
  const body = document.createElement("p");
  body.classList =
    chat.user === username ? "chat-outgoing p-2" : "chat-incoming p-2";
  body.innerText = chat.message;
  mainDiv.appendChild(heading);
  mainDiv.appendChild(body);
  chats.appendChild(mainDiv);
});
