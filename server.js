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
    base.addUser({userId: userId});
    console.log(`-> User ${userId} added.`);

    socket.on("disconnect", () => {

        base.removeUser({userId: userId});
        console.log(`-> User ${userId} disconnected.`);
    })

    socket.on("send", (message) => {

        sockets.emit("receive", (message));
    })
})

server.listen(47, () => {

    console.log("-> Listening on port 47.");
})