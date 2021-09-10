import { generate } from "qrcode-terminal";
import { Client } from "whatsapp-web.js";

try {
	const client = new Client({
		puppeteer: {
			headless: false,
			args: ["--disable-setuid-sandbox", "--no-sandbox"],
		},
	});

	client.initialize();

	client.on("qr", (qr) => generate(qr, { small: true }));
} catch (err) {
	console.log(err);
}
