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
Object.defineProperty(exports, "__esModule", { value: true });
exports.messenger = void 0;
var whatsapp_web_js_1 = require("whatsapp-web.js");
var path_1 = require("path");
var schedule = {};
var dogs_vacines_file_path = path_1.resolve(__dirname, "..", "assets", "[cachorros][vacinas].jpeg");
var cats_vacines_file_path = path_1.resolve(__dirname, "..", "assets", "[gatos][vacinas].jpeg");
var destNumber = "5511968640862@c.us";
var aniamlSizeTypes = ["Grande", "Médio", "Pequeno"];
var groomTypes = ["Higiênica", "Completa"];
function addDays(days) {
    return Date.now() + 1000 * 60 * 60 * 24 * days;
}
var daysToReturn = 7;
function messenger(client, msg, number) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var message, _f, latitude, longitude, locationUrl, _g, _h, _j, _k, _l, _m, _o, media, media, _p, _q, aniamlSize, groom, _r, _s, _t, _u, _v, _w, _x, _y;
        return __generator(this, function (_z) {
            switch (_z.label) {
                case 0:
                    message = msg.body.toLowerCase();
                    if (!(((_a = schedule["" + number]) === null || _a === void 0 ? void 0 : _a.complete) && ((_b = schedule["" + number]) === null || _b === void 0 ? void 0 : _b.time) >= Date.now())) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.sendMessage(number, "Um momento que já vamos lhe atender")];
                case 1:
                    _z.sent();
                    return [2 /*return*/];
                case 2:
                    if (!((_c = schedule["" + number]) === null || _c === void 0 ? void 0 : _c.castration)) return [3 /*break*/, 4];
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back())];
                case 3:
                    _z.sent();
                    schedule["" + number].resume += "Animal: " + message + "\n";
                    schedule["" + number].castration = false;
                    return [2 /*return*/];
                case 4:
                    if (!((_d = schedule["" + number]) === null || _d === void 0 ? void 0 : _d.address)) return [3 /*break*/, 13];
                    if (!msg.location) return [3 /*break*/, 8];
                    _f = msg.location, latitude = _f.latitude, longitude = _f.longitude;
                    locationUrl = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude;
                    schedule["" + number].resume += "Endere\u00E7o: " + locationUrl + "\n";
                    schedule["" + number].address = false;
                    schedule["" + number].complete = true;
                    return [4 /*yield*/, client.sendMessage(number, menuFinish())];
                case 5:
                    _z.sent();
                    _g = completeConversation;
                    _h = [client,
                        schedule["" + number].resume];
                    return [4 /*yield*/, client.getContactById(number)];
                case 6: return [4 /*yield*/, _g.apply(void 0, _h.concat([_z.sent()]))];
                case 7:
                    _z.sent();
                    return [2 /*return*/];
                case 8:
                    schedule["" + number].resume += "Endere\u00E7o: " + message + "\n";
                    schedule["" + number].address = false;
                    schedule["" + number].complete = true;
                    return [4 /*yield*/, client.sendMessage(number, menuFinish())];
                case 9:
                    _z.sent();
                    _j = completeConversation;
                    _k = [client,
                        schedule["" + number].resume];
                    return [4 /*yield*/, client.getContactById(number)];
                case 10: return [4 /*yield*/, _j.apply(void 0, _k.concat([_z.sent()]))];
                case 11:
                    _z.sent();
                    return [2 /*return*/];
                case 12: return [3 /*break*/, 15];
                case 13:
                    if (!((_e = schedule["" + number]) === null || _e === void 0 ? void 0 : _e.hour)) return [3 /*break*/, 15];
                    schedule["" + number].resume += "Disponibilidade de hor\u00E1rio: " + message + "\n";
                    schedule["" + number].hour = false;
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back())];
                case 14:
                    _z.sent();
                    return [2 /*return*/];
                case 15:
                    if (!newClient(number)) return [3 /*break*/, 17];
                    return [4 /*yield*/, client.sendMessage(number, menu())];
                case 16:
                    _z.sent();
                    return [2 /*return*/];
                case 17:
                    schedule["" + number].level += message;
                    if (!(message == "0")) return [3 /*break*/, 19];
                    return [4 /*yield*/, client.sendMessage(number, finishConversation())];
                case 18:
                    _z.sent();
                    delete schedule["" + number];
                    return [2 /*return*/];
                case 19:
                    _l = schedule["" + number].level;
                    switch (_l) {
                        case "11": return [3 /*break*/, 20];
                        case "12": return [3 /*break*/, 22];
                        case "111": return [3 /*break*/, 24];
                        case "121": return [3 /*break*/, 24];
                        case "1111": return [3 /*break*/, 26];
                        case "1211": return [3 /*break*/, 26];
                        case "1112": return [3 /*break*/, 28];
                        case "1212": return [3 /*break*/, 28];
                        case "112": return [3 /*break*/, 32];
                        case "122": return [3 /*break*/, 32];
                        case "1121": return [3 /*break*/, 37];
                        case "1221": return [3 /*break*/, 37];
                        case "1122": return [3 /*break*/, 39];
                        case "1222": return [3 /*break*/, 39];
                        case "113": return [3 /*break*/, 43];
                        case "123": return [3 /*break*/, 43];
                        case "1131": return [3 /*break*/, 45];
                        case "1132": return [3 /*break*/, 45];
                        case "1133": return [3 /*break*/, 45];
                        case "1231": return [3 /*break*/, 45];
                        case "1232": return [3 /*break*/, 45];
                        case "1232": return [3 /*break*/, 45];
                        case "11311": return [3 /*break*/, 47];
                        case "11321": return [3 /*break*/, 47];
                        case "11331": return [3 /*break*/, 47];
                        case "12311": return [3 /*break*/, 47];
                        case "12321": return [3 /*break*/, 47];
                        case "12321": return [3 /*break*/, 47];
                        case "11312": return [3 /*break*/, 47];
                        case "11322": return [3 /*break*/, 47];
                        case "11332": return [3 /*break*/, 47];
                        case "12312": return [3 /*break*/, 47];
                        case "12322": return [3 /*break*/, 47];
                        case "12322": return [3 /*break*/, 47];
                        case "113111": return [3 /*break*/, 49];
                        case "113211": return [3 /*break*/, 49];
                        case "113311": return [3 /*break*/, 49];
                        case "123111": return [3 /*break*/, 49];
                        case "123211": return [3 /*break*/, 49];
                        case "123211": return [3 /*break*/, 49];
                        case "113121": return [3 /*break*/, 49];
                        case "113221": return [3 /*break*/, 49];
                        case "113321": return [3 /*break*/, 49];
                        case "123121": return [3 /*break*/, 49];
                        case "123221": return [3 /*break*/, 49];
                        case "123221": return [3 /*break*/, 49];
                        case "113112": return [3 /*break*/, 51];
                        case "113212": return [3 /*break*/, 51];
                        case "113312": return [3 /*break*/, 51];
                        case "123112": return [3 /*break*/, 51];
                        case "123212": return [3 /*break*/, 51];
                        case "123212": return [3 /*break*/, 51];
                        case "113122": return [3 /*break*/, 51];
                        case "113222": return [3 /*break*/, 51];
                        case "113322": return [3 /*break*/, 51];
                        case "123122": return [3 /*break*/, 51];
                        case "123222": return [3 /*break*/, 51];
                        case "123222": return [3 /*break*/, 51];
                        case "114": return [3 /*break*/, 55];
                        case "124": return [3 /*break*/, 55];
                        case "1141": return [3 /*break*/, 57];
                        case "1241": return [3 /*break*/, 57];
                        case "1142": return [3 /*break*/, 59];
                        case "1242": return [3 /*break*/, 59];
                        case "115": return [3 /*break*/, 63];
                        case "125": return [3 /*break*/, 63];
                        case "1151": return [3 /*break*/, 65];
                        case "1251": return [3 /*break*/, 65];
                        case "11511": return [3 /*break*/, 67];
                        case "11512": return [3 /*break*/, 69];
                        case "1152": return [3 /*break*/, 73];
                        case "1252": return [3 /*break*/, 73];
                        case "11521": return [3 /*break*/, 75];
                        case "12521": return [3 /*break*/, 75];
                        case "11522": return [3 /*break*/, 77];
                        case "12522": return [3 /*break*/, 77];
                    }
                    return [3 /*break*/, 81];
                case 20:
                    schedule["" + number].resume += "Cachorros\n";
                    schedule["" + number].historico.push("dogs");
                    return [4 /*yield*/, client.sendMessage(number, menu_secundary())];
                case 21:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 22:
                    schedule["" + number].resume += "Gatos\n";
                    schedule["" + number].historico.push("cats");
                    return [4 /*yield*/, client.sendMessage(number, menu_secundary())];
                case 23:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 24:
                    schedule["" + number].resume += "Castração\n";
                    schedule["" + number].historico.push("castration");
                    return [4 /*yield*/, client.sendMessage(number, menu_castration())];
                case 25:
                    _z.sent();
                    schedule["" + number].castration = true;
                    return [3 /*break*/, 83];
                case 26:
                    schedule["" + number].resume += "Serviço leva e trás aceito \n";
                    schedule["" + number].historico.push("take_back_service");
                    schedule["" + number].address = true;
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back_answer())];
                case 27:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 28: return [4 /*yield*/, client.sendMessage(number, menuFinish())];
                case 29:
                    _z.sent();
                    schedule["" + number].resume += "Serviço leva e trás negado.\n";
                    schedule["" + number].complete = true;
                    _m = completeConversation;
                    _o = [client,
                        schedule["" + number].resume];
                    return [4 /*yield*/, client.getContactById(number)];
                case 30: return [4 /*yield*/, _m.apply(void 0, _o.concat([_z.sent()]))];
                case 31:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 32:
                    schedule["" + number].resume += "Vacinas\n";
                    schedule["" + number].historico.push("vacines");
                    if (!(schedule["" + number].historico[1] === "cats")) return [3 /*break*/, 34];
                    media = whatsapp_web_js_1.MessageMedia.fromFilePath(cats_vacines_file_path);
                    return [4 /*yield*/, client.sendMessage(number, media, {
                            caption: "A tabela mostra as principais vacinas que seu pet deve tomar! \uD83D\uDC3E\uD83D\uDC89\nNosso atendimento para vacina\u00E7\u00E3o ocorre de segunda-feira \u00E0 s\u00E1bado, das 8h \u00E0s 17h! Qual \u00E9 a sua melhor disponibilidade de hor\u00E1rio?",
                        })];
                case 33:
                    _z.sent();
                    return [3 /*break*/, 36];
                case 34:
                    if (!(schedule["" + number].historico[1] === "dogs")) return [3 /*break*/, 36];
                    media = whatsapp_web_js_1.MessageMedia.fromFilePath(dogs_vacines_file_path);
                    return [4 /*yield*/, client.sendMessage(number, media, {
                            caption: "A tabela mostra as principais vacinas que seu pet deve tomar! \uD83D\uDC3E\uD83D\uDC89\nNosso atendimento para vacina\u00E7\u00E3o ocorre de segunda-feira \u00E0 s\u00E1bado, das 8h \u00E0s 17h! Qual \u00E9 a sua melhor disponibilidade de hor\u00E1rio?",
                        })];
                case 35:
                    _z.sent();
                    _z.label = 36;
                case 36:
                    schedule["" + number].hour = true;
                    return [3 /*break*/, 83];
                case 37:
                    schedule["" + number].resume += "Serviço leva e trás aceito \n";
                    schedule["" + number].historico.push("take_back_service");
                    schedule["" + number].address = true;
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back_answer())];
                case 38:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 39: return [4 /*yield*/, client.sendMessage(number, menuFinish())];
                case 40:
                    _z.sent();
                    schedule["" + number].resume += "Serviço leva e trás negado.\n";
                    schedule["" + number].complete = true;
                    _p = completeConversation;
                    _q = [client,
                        schedule["" + number].resume];
                    return [4 /*yield*/, client.getContactById(number)];
                case 41: return [4 /*yield*/, _p.apply(void 0, _q.concat([_z.sent()]))];
                case 42:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 43:
                    schedule["" + number].resume += "Banho e tosa\n";
                    schedule["" + number].historico.push("bath_and_groom");
                    return [4 /*yield*/, client.sendMessage(number, menu_shower())];
                case 44:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 45:
                    aniamlSize = aniamlSizeTypes[Number(message) - 1];
                    schedule["" + number].historico.push("animal_size");
                    schedule["" + number].resume += "Porte do animal: " + aniamlSize + "\n";
                    return [4 /*yield*/, client.sendMessage(number, menuShowerSecundary())];
                case 46:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 47:
                    groom = groomTypes[Number(message) - 1];
                    schedule["" + number].resume += "Tipo de tosa: " + groom + "\n";
                    schedule["" + number].historico.push("groom_type");
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back())];
                case 48:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 49:
                    schedule["" + number].resume += "Serviço leva e trás\n";
                    schedule["" + number].historico.push("take_back_service");
                    schedule["" + number].address = true;
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back_answer())];
                case 50:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 51: return [4 /*yield*/, client.sendMessage(number, menuFinish())];
                case 52:
                    _z.sent();
                    schedule["" + number].resume += "Serviço leva e trás negado.\n";
                    schedule["" + number].complete = true;
                    _r = completeConversation;
                    _s = [client,
                        schedule["" + number].resume];
                    return [4 /*yield*/, client.getContactById(number)];
                case 53: return [4 /*yield*/, _r.apply(void 0, _s.concat([_z.sent()]))];
                case 54:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 55:
                    schedule["" + number].resume += "Consultas\n";
                    schedule["" + number].historico.push("consults");
                    return [4 /*yield*/, client.sendMessage(number, menuConsults())];
                case 56:
                    _z.sent();
                    schedule["" + number].hour = true;
                    return [3 /*break*/, 83];
                case 57:
                    schedule["" + number].resume += "Serviço leva e trás\n";
                    schedule["" + number].historico.push("take_back_service");
                    schedule["" + number].address = true;
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back_answer())];
                case 58:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 59: return [4 /*yield*/, client.sendMessage(number, menuFinish())];
                case 60:
                    _z.sent();
                    schedule["" + number].resume += "Serviço leva e trás nagado.\n";
                    schedule["" + number].complete = true;
                    _t = completeConversation;
                    _u = [client,
                        schedule["" + number].resume];
                    return [4 /*yield*/, client.getContactById(number)];
                case 61: return [4 /*yield*/, _t.apply(void 0, _u.concat([_z.sent()]))];
                case 62:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 63:
                    schedule["" + number].resume += "Cirurgias Gerias.\n";
                    schedule["" + number].historico.push("general_surgery");
                    return [4 /*yield*/, client.sendMessage(number, menuGeneralSurgery())];
                case 64:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 65: return [4 /*yield*/, client.sendMessage(number, menu_go_to_back())];
                case 66:
                    _z.sent();
                    schedule["" + number].resume += "Animal internado.\n";
                    schedule["" + number].historico.push("animal_hospitalized");
                    return [3 /*break*/, 83];
                case 67:
                    schedule["" + number].address = true;
                    schedule["" + number].resume += "Serviço leva e trás\n";
                    schedule["" + number].historico.push("take_back_service");
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back_answer())];
                case 68:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 69:
                    schedule["" + number].resume += "Servi\u00E7o de leva e tr\u00E1s negado.\n";
                    schedule["" + number].resume += "Conversa completa as " + new Date().toLocaleString();
                    schedule["" + number].historico.push("complete");
                    schedule["" + number].complete = true;
                    return [4 /*yield*/, client.sendMessage(number, menuFinish())];
                case 70:
                    _z.sent();
                    _v = completeConversation;
                    _w = [client,
                        schedule["" + number].resume];
                    return [4 /*yield*/, client.getContactById(number)];
                case 71: return [4 /*yield*/, _v.apply(void 0, _w.concat([_z.sent()]))];
                case 72:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 73:
                    schedule["" + number].resume += "Sem animal internado\n";
                    schedule["" + number].historico.push("take_back_service");
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back())];
                case 74:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 75:
                    schedule["" + number].resume += "Serviço leva e trás\n";
                    schedule["" + number].historico.push("take_back_service");
                    return [4 /*yield*/, client.sendMessage(number, menu_go_to_back_answer())];
                case 76:
                    _z.sent();
                    schedule["" + number].address = true;
                    return [3 /*break*/, 83];
                case 77:
                    schedule["" + number].resume += "Sem servi\u00E7o de leva e tr\u00E1s\n";
                    schedule["" + number].resume += "Conversa completa as " + new Date().toLocaleString();
                    schedule["" + number].historico.push("complete");
                    schedule["" + number].complete = true;
                    return [4 /*yield*/, client.sendMessage(number, menuFinish())];
                case 78:
                    _z.sent();
                    _x = completeConversation;
                    _y = [client,
                        schedule["" + number].resume];
                    return [4 /*yield*/, client.getContactById(number)];
                case 79: return [4 /*yield*/, _x.apply(void 0, _y.concat([_z.sent()]))];
                case 80:
                    _z.sent();
                    return [3 /*break*/, 83];
                case 81: return [4 /*yield*/, client.sendMessage(number, wrongAnswer())];
                case 82:
                    _z.sent();
                    delete schedule["" + number];
                    return [3 /*break*/, 83];
                case 83: return [2 /*return*/];
            }
        });
    });
}
exports.messenger = messenger;
// interface I_Client {
// 	sendMessage: (
// 		number: string,
// 		message: string | MessageMedia,
// 		options?: {}
// 	) => Promise<void>;
// }
// class CClient implements I_Client {
// 	async sendMessage(
// 		number: string,
// 		message: string | MessageMedia,
// 		options?: {}
// 	) {
// 		console.log(
// 			`Mesagem: \n\n${message}\n\nEnviada para o número: ${number}`
// 		);
// 	}
// }
// const client: I_Client = new CClient();
// Castration with take back service
// (async () => {
// 	await messenger(client, "ola bom dia!", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "viralata, 15kg, 4 anos", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "Rua jacarta, santa regina N 1078", "554784288351@c.us");
// })();
// Castration without take back service
// (async () => {
// 	await messenger(client, "ola bom dia!", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "viralata, 15kg, 4 anos", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// })();
// Vacines with take back service
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// })();
// Vacines without take back service
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "Rua jacarta, santa regina 1078", "554784288351@c.us");
// })();
// Bath and groom with take back service
// (async () => {
// 	await messenger(client, "oie", "5547984288351@c.us");
// 	await messenger(client, "1", "5547984288351@c.us");
// 	await messenger(client, "3", "5547984288351@c.us");
// 	await messenger(client, "1", "5547984288351@c.us");
// 	await messenger(client, "1", "5547984288351@c.us");
// 	await messenger(client, "1", "5547984288351@c.us");
// 	await messenger(client, "Rua jacarta, santa regina 1078", "5547984288351@c.us");
// })();
// Bath and groom without take back service
// (async () => {
// 	await messenger(client, "oie", "5547984288351@c.us");
// 	await messenger(client, "1", "5547984288351@c.us");
// 	await messenger(client, "3", "5547984288351@c.us");
// 	await messenger(client, "1", "5547984288351@c.us");
// 	await messenger(client, "1", "5547984288351@c.us");
// 	await messenger(client, "2", "5547984288351@c.us");
// })();
// Consultas with take back service
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "4", "554784288351@c.us");
// 	await messenger(client, "Entre as 8 e 10 da manhã", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "Rua jacarta 1078", "554784288351@c.us");
// })();
// Consults without take back service
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "4", "554784288351@c.us");
// 	await messenger(client, "Entre as 8 e 10 da manhã", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// })();
// general surgery with take back service and without hospitalized animal
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "5", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "Rua jacarta 1078 santa regina", "554784288351@c.us");
// })();
// General surgery without take back service and also without hospitalized animal
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "5", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// })();
// General surgery with take back and with hospitalized animal
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "5", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "Rua jarcarta 1078", "554784288351@c.us");
// })();
// General surgery without take back and with hospitalized animal
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "5", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// })();
// General surgery with animal
// (async () => {
// 	await messenger(client, "oie", "554784288351@c.us");
// 	await messenger(client, "1", "554784288351@c.us");
// 	await messenger(client, "5", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// 	await messenger(client, "2", "554784288351@c.us");
// })();
function completeConversation(client, resume, contact) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.sendMessage(destNumber, resume)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.sendMessage(destNumber, contact)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function finishConversation() {
    var message = "Obrigado por entrar em contato, qualquer dúvida estaremos a sua disposição basta falar um 'oi' aqui nesse número.";
    return message;
}
function wrongAnswer() {
    var message = "Parece que sua resposta não esta dentro dos parâmetros que informamos anteriormente, poderia repetir por gentileza.";
    return message;
}
function newClient(number) {
    if (schedule["" + number]) {
        if (schedule["" + number].time <= Date.now()) {
            schedule["" + number] = {
                complete: false,
                level: "1",
                new: true,
                castration: false,
                address: false,
                hour: false,
                number: number,
                resume: "Inicio " + new Date().toLocaleString() + "\n\n",
                historico: ["start"],
                time: addDays(daysToReturn),
            };
            return true;
        }
        schedule["" + number].new = false;
        return false;
    }
    else {
        var contact = {
            complete: false,
            level: "1",
            new: true,
            castration: false,
            address: false,
            hour: false,
            number: number,
            resume: "Inicio " + new Date().toLocaleString() + "\n\n",
            historico: ["start"],
            time: addDays(daysToReturn),
        };
        schedule["" + number] = contact;
        return true;
    }
}
function menuFinish() {
    var message = "Obrigado pelas informações, atenderemos você o mais brevemente possível!";
    return message;
}
function menu() {
    var message = "Ol\u00E1, tudo bem? \uD83D\uDE0A\n";
    message +=
        "Somos do Centro Veterinário Popular Social, o Vet Popular! 🐾🐶🐱\n";
    message +=
        "Nosso atendimento ocorre de segunda-feira à sábado, das 8h às 17h!\n";
    message +=
        "Para iniciarmos seu atendimento de forma rápida e prática, peço que me responda se o seu pet é um cachorro 🐶 ou um gato 🐱 de acordo com os números abaixo: \n";
    message += "1 - Cachorro\n";
    message += "2 - Gato";
    return message;
}
function menu_secundary() {
    var message = "Qual tipo de serviço você precisa?\n";
    message += "1 - Castração\n";
    message += "2 - Vacinas\n";
    message += "3 - Banho e tosa\n";
    message += "4 - Consultas\n";
    message += "5 - Cirurgia gerais\n\n";
    message += "Digite 0 para encerrar a conversa.";
    return message;
}
function menu_go_to_back() {
    var message = "Você deseja nosso serviço de leva e traz 🚗  para seu pet? 🐾\n";
    message += "1 - Sim\n";
    message += "2 - Não\n\n";
    message += "Digite 0 para encerrar a conversa.";
    return message;
}
function menu_go_to_back_answer() {
    var message = "Porfavor nos informe o seu endereço ou nos mande a localização de sua casa para calcularmos o valor.";
    return message;
}
function menu_shower() {
    var message = "Agora por favor poderia nos informar o porte do seu cachorro:\n";
    message += "1 - Grande (acima de 30kg)\n";
    message += "2 - Médio (entre 15 e 30 quilos)\n";
    message += "3 - Pequeno (abaixo de 15 quilos)\n\n";
    message += "Digite 0 para encerrar a conversa aqui caso queira.";
    return message;
}
function menuShowerSecundary() {
    var message = "Que tipo de tosa você gostaria?\n";
    message += "1 - Para tosa higiência\n";
    message += "2 - Para tosa completa\n\n";
    message += "Digite 0 para encerrar a conversa aqui caso queira.";
    return message;
}
function menuConsults() {
    var message = "Nosso atendimento ocorre de segunda-feira à sábado, das 8h às 17h! Qual é a sua melhor disponibilidade de horário?";
    return message;
}
function menu_castration() {
    var message = "Escreva a raça, peso e idade do seu pet separado por virgulas por favor. \n";
    message += "Exemplo: pastor alemão, 30kg, 7 anos";
    return message;
}
function menuGeneralSurgery() {
    var message = "Você possui algum animal internado conosco?\n";
    message += "1 - Sim\n";
    message += "2 - Não\n\n";
    message += "Digite 0 para encerrar a conversa.";
    return message;
}
