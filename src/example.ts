import { Client } from "whatsapp-web.js";
import { generate } from "qrcode-terminal";

const client = new Client({
    puppeteer: {
        args: ["--no-sandbox", '--disable-setuid-sandbox']
    }
});

try {
    client.initialize();
    client.on("qr", qr => generate(qr));

} catch(err) {
    console.error(err);
}
