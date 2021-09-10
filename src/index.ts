import { createServer } from "http";
import { Server } from "socket.io";
import { resolve } from "path";
import express from "express";
import ChatBot from "./bot";

const INDEX_FILE_PATH = resolve(__dirname, "public", "index.html");

let Bot: ChatBot = new ChatBot();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));

app.get("/3821c8bb9990e92045d0116f5a45242e", (_, res) =>
	res.sendFile(INDEX_FILE_PATH)
);

const server = createServer(app);
export const socket = new Server(server, {
	cors: { origin: "*" },
});

socket.on("connection", (socket) => {
	socket.on("disconnect", (socket) => console.log(socket + " disconnected"));
	console.log(`Socket connected: ${socket.id}`);

	socket.emit("status", Bot.status);
	socket.on("pair", async () => {
        if (Bot.client.pupBrowser) {
            await Bot.client.destroy();

            Bot = new ChatBot();
            Bot.pair(socket);
            return;
        };

        Bot.pair(socket);
    });
});

server.listen(3333, () => console.log("Server Running"));
export default server;
