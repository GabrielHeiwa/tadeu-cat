"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = require("qrcode-terminal");
const client = new whatsapp_web_js_1.Client({
    puppeteer: {
        args: ["--no-sandbox", '--disable-setuid-sandbox']
    }
});
try {
    client.initialize();
    client.on("qr", qr => qrcode_terminal_1.generate(qr));
}
catch (err) {
    console.error(err);
}
