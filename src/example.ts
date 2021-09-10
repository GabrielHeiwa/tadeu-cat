import { generate } from "qrcode-terminal";
import { Client } from "whatsapp-web.js";

try {
	const client = new Client({
		puppeteer: {
			headless: false,
			args: ["--disable-setuid-sandbox", "--no-sandbox"],
		},
	});

	client.on("qr", (qr) => generate(qr, { small: true }));

	client.initialize();

} catch (err) {
	console.log(err);
}
