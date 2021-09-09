"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var whatsapp_web_js_1 = require("whatsapp-web.js");
var qrcode_terminal_1 = require("qrcode-terminal");
var client = new whatsapp_web_js_1.Client({
    puppeteer: {
        args: ["--no-sandbox", '--disable-setuid-sandbox']
    }
});
client.initialize();
client.on("qr", function (qr) { return qrcode_terminal_1.generate(qr); });
