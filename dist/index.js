"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var path_1 = require("path");
var express_1 = __importDefault(require("express"));
var bot_1 = __importDefault(require("./bot"));
var INDEX_FILE_PATH = path_1.resolve(__dirname, "public", "index.html");
var Bot = new bot_1.default();
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("/public"));
app.get("/3821c8bb9990e92045d0116f5a45242e", function (_, res) { return res.sendFile(INDEX_FILE_PATH); });
var server = http_1.createServer(app);
exports.socket = new socket_io_1.Server(server, { cors: { origin: "*" } });
exports.socket.on("connection", function (socket) {
    console.log("Socket connected: " + socket.id);
    socket.emit("status", Bot.status);
    socket.on("pair", function () { return Bot.pair(socket); });
});
server.listen(3333, function () { return console.log('Server Running'); });
exports.default = server;
