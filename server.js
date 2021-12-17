import http from "http";
import express from "express";
import {Server} from "socket.io";
import main from "./public/scripts/main.js";

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

app.use(express.static("public"));

const base = main();

sockets.on("connection", (socket) => {

    const userId = socket.id;
    let name;

    socket.on("add", (command) => {

        name = command.name;
        base.addUser({userId, name});
        console.log(`-> User ${name} connected.`);
    })

    socket.on("disconnect", () => {

        base.removeUser({userId: userId});
        console.log(`-> User ${name} disconnected.`);
    })

    socket.on("send", (message) => {

        sockets.emit("receive", (message));
    })
})

server.listen(47, () => {

    console.log("-> Listening on port 47.");
})