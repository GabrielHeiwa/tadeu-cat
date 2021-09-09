"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var whatsapp_web_js_1 = require("whatsapp-web.js");
var qrcode_1 = require("qrcode");
var logger_1 = __importDefault(require("../logger"));
var fs_1 = __importDefault(require("fs"));
var messenger_1 = require("../messenger");
var SESSION_FILE_PATH = "./session.json";
var sessionCfg;
if (fs_1.default.existsSync(SESSION_FILE_PATH))
    fs_1.default.rmSync(SESSION_FILE_PATH);
var ChatBot = /** @class */ (function () {
    function ChatBot() {
        this.client = new whatsapp_web_js_1.Client({
            session: sessionCfg,
            qrTimeoutMs: 0,
            puppeteer: {
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                ignoreHTTPSErrors: true,
            },
        });
        this.status = "ChatBot ainda não autenticado com o whatsapp web";
    }
    ChatBot.prototype.pair = function (socket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Solicitação de pareamento recebida");
                        if (!this.sessionFileExist()) return [3 /*break*/, 3];
                        if (!this.client.pupPage) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.destroy()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.removeSessionFile();
                        this.startChatBot(socket);
                        return [2 /*return*/];
                    case 3:
                        if (!this.client.pupPage) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.client.destroy()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.startChatBot(socket);
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatBot.prototype.startChatBot = function (socket) {
        var _this = this;
        this.client
            .initialize()
            .then(function () { return console.log("Sucesso ao abrir chrome"); })
            .catch(function (err) {
            console.log(err);
            logger_1.default.error(err.message, {
                date: new Date().toLocaleString(),
            });
        });
        this.client.on("qr", function (qr) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log("Enviando qrcode");
                        _b = (_a = socket).emit;
                        _c = ["qr"];
                        return [4 /*yield*/, qrcode_1.toDataURL(qr)];
                    case 1:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        return [2 /*return*/];
                }
            });
        }); });
        this.client.on("authenticated", function (session) {
            console.log("Autenticado");
            logger_1.default.info("Chat bot authenticated", {
                date: new Date().toLocaleString(),
            });
            sessionCfg = session;
            fs_1.default.writeFile("session.json", JSON.stringify(session), function (err) {
                return err !== null && err !== void 0 ? err : logger_1.default.error("Error to create session file", {
                    date: new Date().toLocaleString(),
                });
            });
            _this.status = "autenticado";
            socket.emit("status", _this.status);
        });
        this.client.on("ready", function () {
            console.log("Bot pronto para começar");
            logger_1.default.info("ChatBot ready to job", {
                date: new Date().toLocaleString(),
            });
            socket.emit("status", "ChatBot pronto para começar");
        });
        this.client.on("message", function (msg) { return __awaiter(_this, void 0, void 0, function () {
            var from;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        from = msg.from;
                        if (!from.match(/5511968640862@c.us/)) return [3 /*break*/, 2];
                        return [4 /*yield*/, messenger_1.messenger(this.client, msg, from)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    ChatBot.prototype.removeSessionFile = function () {
        fs_1.default.rmSync(SESSION_FILE_PATH, {});
        if (this.sessionFileExist()) {
            logger_1.default.info("Success to remove session file", {
                date: new Date().toLocaleString(),
            });
        }
        else {
            logger_1.default.error("Error to remove session file", {
                date: new Date().toLocaleString(),
            });
        }
    };
    ChatBot.prototype.sessionFileExist = function () {
        return fs_1.default.existsSync(SESSION_FILE_PATH);
    };
    return ChatBot;
}());
exports.default = ChatBot;
