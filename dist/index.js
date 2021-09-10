"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = require("path");
const express_1 = __importDefault(require("express"));
const bot_1 = __importDefault(require("./bot"));
const INDEX_FILE_PATH = path_1.resolve(__dirname, "public", "index.html");
let Bot = new bot_1.default();
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("/public"));
app.get("/3821c8bb9990e92045d0116f5a45242e", (_, res) => res.sendFile(INDEX_FILE_PATH));
const server = http_1.createServer(app);
exports.socket = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
exports.socket.on("connection", (socket) => {
    socket.on("disconnect", (socket) => console.log(socket + " disconnected"));
    console.log(`Socket connected: ${socket.id}`);
    socket.emit("status", Bot.status);
    socket.on("pair", async () => {
        if (Bot.client.pupBrowser) {
            await Bot.client.destroy();
            Bot = new bot_1.default();
            Bot.pair(socket);
            return;
        }
        ;
        Bot.pair(socket);
    });
});
server.listen(3333, () => console.log("Server Running"));
exports.default = server;
