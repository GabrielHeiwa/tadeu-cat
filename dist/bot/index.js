"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_1 = require("qrcode");
const messenger_1 = require("../messenger");
const logger_1 = require("../logger");
const SESSION_FILE_PATH = "./session.json";
class ChatBot {
    constructor() {
        this.status = "ChatBot ainda não autenticado com o whatsapp web";
        logger_1.logger.info("ChatBot Instanciado", {
            data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
        });
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
        logger_1.logger.info("Solicitação de pareamento recebida", {
            data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
        });
        this.startChatBot(socket);
    }
    startChatBot(socket) {
        logger_1.logger.info(`Iniciando navegador`, {
            data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
        });
        this.client.initialize().catch((err) => logger_1.logger.error(`${err}`, {
            data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
        }));
        this.client.on("qr", async (qr) => {
            logger_1.logger.info(`send qr code for: ${socket.id}`, {
                data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
            });
            socket.emit("qr", await qrcode_1.toDataURL(qr));
        });
        this.client.on("authenticated", (_) => {
            logger_1.logger.info(`Autenticado`, {
                data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
            });
            this.status = "autenticado";
            socket.emit("status", this.status);
        });
        this.client.on("ready", () => {
            logger_1.logger.info(`Bot pronto para começar`, {
                data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
            });
        });
        this.client.on("message", async (msg) => {
            const { from } = msg;
            logger_1.logger.info(`Message receive from ${from} - text: ${msg.body}`, {
                data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
            });
            if (from.match(/@c.us/))
                await messenger_1.messenger(this.client, msg, from);
        });
    }
}
exports.default = ChatBot;
