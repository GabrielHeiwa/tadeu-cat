"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_terminal_1 = require("qrcode-terminal");
const whatsapp_web_js_1 = require("whatsapp-web.js");
try {
    const client = new whatsapp_web_js_1.Client({
        puppeteer: {
            headless: false,
            args: ["--disable-setuid-sandbox", "--no-sandbox"],
        },
    });
    client.on("qr", (qr) => qrcode_terminal_1.generate(qr, { small: true }));
    client.initialize();
}
catch (err) {
    console.log(err);
}
