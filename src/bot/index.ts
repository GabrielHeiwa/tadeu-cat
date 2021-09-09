import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io";
import { Client } from "whatsapp-web.js";
import { toDataURL } from "qrcode";
import { messenger } from "../messenger";
import fs from "fs";

type SocketType = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

const SESSION_FILE_PATH = "./session.json";

export default class ChatBot {
	private client: Client;

	constructor() {
		this.client = new Client({
			qrTimeoutMs: 0,
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
		console.log("Iniciando navegador");

		this.client.on("qr", async (qr) => {
			console.log("Enviando qrcode");
			socket.emit("qr", await toDataURL(qr));
		});

		this.client.on("authenticated", (session) => {
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

			if (from.match(/554788681894@c.us/))
				await messenger(this.client, msg, from);
		});

		this.client.initialize();
	}

	private removeSessionFile() {
		fs.rmSync(SESSION_FILE_PATH, {});
	}

	private sessionFileExist() {
		return fs.existsSync(SESSION_FILE_PATH);
	}
}
