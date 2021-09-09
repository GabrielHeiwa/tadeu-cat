import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io";
import { Client } from "whatsapp-web.js";
import { toDataURL } from "qrcode";
import logger from "../logger";
import fs from "fs";
import { messenger } from "../messenger";

type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

const SESSION_FILE_PATH = "./session.json";


export default class ChatBot {
	private client: Client = new Client({
		qrTimeoutMs: 0,
		puppeteer: {
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		},
	});

	public status: string = "ChatBot ainda não autenticado com o whatsapp web";

	public async pair(socket: SocketType) {
		console.log("Solicitação de pareamento recebida");

		if (this.sessionFileExist()) {
			if (this.client.pupPage) await this.client.destroy();
			this.removeSessionFile();
			this.startChatBot(socket);
			return;
		}

		this.startChatBot(socket);
	}

	private startChatBot(socket: SocketType) {
		this.client
			.initialize()
			.catch((err) => {
				logger.error(err.message, {
					date: new Date().toLocaleString(),
				});
			});

		this.client.on("qr", async (qr) => {
			console.log("Enviando qrcode");
			socket.emit("qr", await toDataURL(qr));
		});

		this.client.on("authenticated", (session) => {
			console.log("Autenticado");
			logger.info("Chat bot authenticated", {
				date: new Date().toLocaleString(),
			});

			this.status = "autenticado";
			socket.emit("status", this.status);
		});

		this.client.on("ready", () => {
			console.log("Bot pronto para começar");
			logger.info("ChatBot ready to job", {
				date: new Date().toLocaleString(),
			});

			socket.emit("status", "ChatBot pronto para começar");
		});

		this.client.on("message", async (msg) => {
			const { from } = msg;

			if (from.match(/5511968640862@c.us/))
				await messenger(this.client, msg, from);
		});
	}

	private removeSessionFile() {
		fs.rmSync(SESSION_FILE_PATH, {});

		if (this.sessionFileExist()) {
			logger.info("Success to remove session file", {
				date: new Date().toLocaleString(),
			});
		} else {
			logger.error("Error to remove session file", {
				date: new Date().toLocaleString(),
			});
		}
	}

	private sessionFileExist() {
		return fs.existsSync(SESSION_FILE_PATH);
	}
}
