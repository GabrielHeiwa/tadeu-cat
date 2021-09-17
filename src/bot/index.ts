import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io";
import { Client, ContactId } from "whatsapp-web.js";
import { toDataURL } from "qrcode";
import { messenger } from "../messenger";
import fs from "fs";
import { logger } from "../logger";

type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

const SESSION_FILE_PATH = "./session.json";

export default class ChatBot {
	public client: Client;

	constructor() {
		logger.info("ChatBot Instanciado", {
			data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
		});
		this.client = new Client({
			puppeteer: {
				args: [
					"--disable-setuid-sandbox",
					"--no-sandbox",
					"--disable-extensions",
				],
			},
		});
	}

	public status: string = "ChatBot ainda não autenticado com o whatsapp web";

	public async pair(socket: SocketType) {
		logger.info("Solicitação de pareamento recebida", {
			data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
		});
		this.startChatBot(socket);
	}

	private startChatBot(socket: SocketType) {
		logger.info(`Iniciando navegador`, {
			data: new Date(Date.now() - 3 * 1000 * 60 * 60).toLocaleString(),
		});

		this.client.initialize().catch((err) =>
			logger.error(`${err}`, {
				data: new Date(
					Date.now() - 3 * 1000 * 60 * 60
				).toLocaleString(),
			})
		);

		this.client.on("qr", async (qr) => {
			logger.info(`send qr code for: ${socket.id}`, {
				data: new Date(
					Date.now() - 3 * 1000 * 60 * 60
				).toLocaleString(),
			});
			socket.emit("qr", await toDataURL(qr));
		});

		this.client.on("authenticated", (_) => {
			logger.info(`Autenticado`, {
				data: new Date(
					Date.now() - 3 * 1000 * 60 * 60
				).toLocaleString(),
			});
			this.status = "autenticado";
			socket.emit("status", this.status);
		});

		this.client.on("ready", () => {
			logger.info(`Bot pronto para começar`, {
				data: new Date(
					Date.now() - 3 * 1000 * 60 * 60
				).toLocaleString(),
			});
		});

		this.client.on("message", async (msg) => {
			const { from } = msg;
			logger.info(`Message receive from ${from} - text: ${msg.body}`, {
				data: new Date(
					Date.now() - 3 * 1000 * 60 * 60
				).toLocaleString(),
			});

			if (from.match(/@c.us/)) await messenger(this.client, msg, from);
		});
	}
}
