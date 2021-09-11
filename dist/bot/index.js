"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_1 = require("qrcode");
const messenger_1 = require("../messenger");
const fs_1 = __importDefault(require("fs"));
const SESSION_FILE_PATH = "./session.json";
class ChatBot {
    constructor() {
        this.status = "ChatBot ainda não autenticado com o whatsapp web";
        console.log("ChatBot Instanciado");
        this.client = new whatsapp_web_js_1.Client({
            puppeteer: {
                args: [
                    "--disable-setuid-sandbox",
                    "--no-sandbox",
                    "--disable-extensions",
                ],
            },
        });
    }
    async pair(socket) {
        console.log("Solicitação de pareamento recebida");
        this.startChatBot(socket);
    }
    startChatBot(socket) {
        console.log("Iniciando navegador");
        this.client.initialize().catch((err) => console.error(err));
        this.client.on("qr", async (qr) => {
            console.log(`send qr code for: ${socket.id}`);
            socket.emit("qr", await qrcode_1.toDataURL(qr));
        });
        this.client.on("authenticated", (_) => {
            console.log("Autenticado");
            this.status = "autenticado";
            socket.emit("status", this.status);
        });
        this.client.on("ready", () => {
            console.log("Bot pronto para começar");
            socket.emit("status", "ChatBot pronto para começar");
        });
        this.client.on("message", async (msg) => {
            const { from } = msg;
            if (from.match(/554791361160@c.us/))
                await messenger_1.messenger(this.client, msg, from);
        });
    }
    removeSessionFile() {
        fs_1.default.rmSync(SESSION_FILE_PATH, {});
    }
    sessionFileExist() {
        return fs_1.default.existsSync(SESSION_FILE_PATH);
    }
}
exports.default = ChatBot;
