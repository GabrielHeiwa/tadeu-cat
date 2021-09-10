"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messenger = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const path_1 = require("path");
const dayjs_1 = __importDefault(require("dayjs"));
const schedule = {};
const dogs_vacines_file_path = path_1.resolve(__dirname, "..", "assets", "[cachorros][vacinas].jpeg");
const cats_vacines_file_path = path_1.resolve(__dirname, "..", "assets", "[gatos][vacinas].jpeg");
const aniamlSizeTypes = ["Pequeno", "Médio", "Grande"];
const groomTypes = ["Higiênica", "Completa"];
function addDays(days) {
    return Date.now() + 1000 * 60 * 60 * 24 * days;
}
const daysToReturn = 7;
async function messenger(client, msg, number) {
    var _a, _b, _c, _d, _e, _f;
    const message = msg.body.toLowerCase();
    if (((_a = schedule[`${number}`]) === null || _a === void 0 ? void 0 : _a.complete) &&
        ((_b = schedule[`${number}`]) === null || _b === void 0 ? void 0 : _b.time) >= Date.now() &&
        !((_c = schedule[`${number}`]) === null || _c === void 0 ? void 0 : _c.waiting)) {
        schedule[`${number}`].waiting = true;
        await client.sendMessage(number, "Um momento que já vamos lhe atender");
        return;
    }
    else if ((_d = schedule[`${number}`]) === null || _d === void 0 ? void 0 : _d.castration) {
        await client.sendMessage(number, menu_go_to_back());
        schedule[`${number}`].resume += `Animal: ${message}\n`;
        schedule[`${number}`].castration = false;
        return;
    }
    else if ((_e = schedule[`${number}`]) === null || _e === void 0 ? void 0 : _e.address) {
        if (msg.location) {
            const { latitude, longitude } = msg.location;
            const locationUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            schedule[`${number}`].resume += `Endereço: ${locationUrl}\n`;
            schedule[`${number}`].address = false;
            schedule[`${number}`].complete = true;
            await client.sendMessage(number, menuFinish());
            await completeConversation(client, schedule[`${number}`].resume, await client.getContactById(number));
            return;
        }
        else {
            schedule[`${number}`].resume += `Endereço: ${message}\n`;
            schedule[`${number}`].address = false;
            schedule[`${number}`].complete = true;
            await client.sendMessage(number, menuFinish());
            await completeConversation(client, schedule[`${number}`].resume, await client.getContactById(number));
            return;
        }
    }
    else if ((_f = schedule[`${number}`]) === null || _f === void 0 ? void 0 : _f.hour) {
        schedule[`${number}`].resume += `Disponibilidade de horário: ${message}\n`;
        schedule[`${number}`].hour = false;
        await client.sendMessage(number, menu_go_to_back());
        return;
    }
    if (newClient(number)) {
        await client.sendMessage(number, menu());
        return;
    }
    else {
        if (schedule[`${number}`].complete && schedule[`${number}`].waiting) {
            return;
        }
        schedule[`${number}`].level += message;
        if (message == "0") {
            await client.sendMessage(number, finishConversation());
            delete schedule[`${number}`];
            return;
        }
        switch (schedule[`${number}`].level) {
            // Dogs
            case "11":
                schedule[`${number}`].resume += "Cachorros\n";
                schedule[`${number}`].historico.push("dogs");
                await client.sendMessage(number, menu_secundary());
                break;
            // Cats
            case "12":
                schedule[`${number}`].resume += "Gatos\n";
                schedule[`${number}`].historico.push("cats");
                await client.sendMessage(number, menu_secundary());
                break;
            // Castration
            case "111":
            case "121":
                schedule[`${number}`].resume += "Castração\n";
                schedule[`${number}`].historico.push("castration");
                await client.sendMessage(number, menu_castration());
                schedule[`${number}`].castration = true;
                break;
            // Castration with take back service
            case "1111":
            case "1211":
                schedule[`${number}`].resume += "Serviço leva e traz aceito \n";
                schedule[`${number}`].historico.push("take_back_service");
                schedule[`${number}`].address = true;
                await client.sendMessage(number, menu_go_to_back_answer());
                break;
            // Without take back service of castration
            case "1112":
            case "1212":
                await client.sendMessage(number, menuFinish());
                schedule[`${number}`].resume += "Serviço leva e traz negado.\n";
                schedule[`${number}`].complete = true;
                await completeConversation(client, schedule[`${number}`].resume, await client.getContactById(number));
                break;
            // Vacines
            case "112":
            case "122":
                schedule[`${number}`].resume += "Vacinas\n";
                schedule[`${number}`].historico.push("vacines");
                if (schedule[`${number}`].historico[1] === "cats") {
                    const media = whatsapp_web_js_1.MessageMedia.fromFilePath(cats_vacines_file_path);
                    await client.sendMessage(number, media, {
                        caption: `A tabela mostra as principais vacinas que seu pet deve tomar! 🐾💉\nNosso atendimento para vacinação ocorre de segunda-feira à sábado, das 8h às 17h! Qual é a sua melhor disponibilidade de horário?`,
                    });
                }
                else if (schedule[`${number}`].historico[1] === "dogs") {
                    const media = whatsapp_web_js_1.MessageMedia.fromFilePath(dogs_vacines_file_path);
                    await client.sendMessage(number, media, {
                        caption: `A tabela mostra as principais vacinas que seu pet deve tomar! 🐾💉\nNosso atendimento para vacinação ocorre de segunda-feira à sábado, das 8h às 17h! Qual é a sua melhor disponibilidade de horário?`,
                    });
                }
                schedule[`${number}`].hour = true;
                break;
            // Vacines with take back service
            case "1121":
            case "1221":
                schedule[`${number}`].resume += "Serviço leva e traz aceito \n";
                schedule[`${number}`].historico.push("take_back_service");
                schedule[`${number}`].address = true;
                await client.sendMessage(number, menu_go_to_back_answer());
                break;
            // Vacines wihtout take back service
            case "1122":
            case "1222":
                await client.sendMessage(number, menuFinish());
                schedule[`${number}`].resume += "Serviço leva e traz negado.\n";
                schedule[`${number}`].complete = true;
                await completeConversation(client, schedule[`${number}`].resume, await client.getContactById(number));
                break;
            // Bath and groom
            case "113":
            case "123":
                schedule[`${number}`].resume += "Banho e tosa\n";
                schedule[`${number}`].historico.push("bath_and_groom");
                schedule[`${number}`].historico.includes("cats")
                    ? await client.sendMessage(number, menu_shower("cat"))
                    : await client.sendMessage(number, menu_shower("dog"));
                break;
            // Define animal size
            case "1131":
            case "1132":
            case "1133":
            case "1231":
            case "1232":
            case "1232":
                const aniamlSize = aniamlSizeTypes[Number(message) - 1];
                schedule[`${number}`].historico.push("animal_size");
                schedule[`${number}`].resume += `Porte do animal: ${aniamlSize}\n`;
                await client.sendMessage(number, menuShowerSecundary());
                break;
            // Define type of groom
            case "11311":
            case "11321":
            case "11331":
            case "12311":
            case "12321":
            case "12321":
            case "11312":
            case "11322":
            case "11332":
            case "12312":
            case "12322":
            case "12322":
                const groom = groomTypes[Number(message) - 1];
                schedule[`${number}`].resume += `Tipo de tosa: ${groom}\n`;
                schedule[`${number}`].historico.push("groom_type");
                await client.sendMessage(number, menu_go_to_back());
                break;
            // With take back service
            case "113111":
            case "113211":
            case "113311":
            case "123111":
            case "123211":
            case "123211":
            case "113121":
            case "113221":
            case "113321":
            case "123121":
            case "123221":
            case "123221":
                schedule[`${number}`].resume += "Serviço leva e traz\n";
                schedule[`${number}`].historico.push("take_back_service");
                schedule[`${number}`].address = true;
                await client.sendMessage(number, menu_go_to_back_answer());
                break;
            // Without take back service
            case "113112":
            case "113212":
            case "113312":
            case "123112":
            case "123212":
            case "123212":
            case "113122":
            case "113222":
            case "113322":
            case "123122":
            case "123222":
            case "123222":
                await client.sendMessage(number, menuFinish());
                schedule[`${number}`].resume += "Serviço leva e traz negado.\n";
                schedule[`${number}`].complete = true;
                await completeConversation(client, schedule[`${number}`].resume, await client.getContactById(number));
                break;
            // Consults
            case "114":
            case "124":
                schedule[`${number}`].resume += "Consultas\n";
                schedule[`${number}`].historico.push("consults");
                await client.sendMessage(number, menuConsults());
                schedule[`${number}`].hour = true;
                break;
            // Consults with take back service
            case "1141":
            case "1241":
                schedule[`${number}`].resume += "Serviço leva e traz\n";
                schedule[`${number}`].historico.push("take_back_service");
                schedule[`${number}`].address = true;
                await client.sendMessage(number, menu_go_to_back_answer());
                break;
            case "1142":
            case "1242":
                await client.sendMessage(number, menuFinish());
                schedule[`${number}`].resume += "Serviço leva e traz nagado.\n";
                schedule[`${number}`].complete = true;
                await completeConversation(client, schedule[`${number}`].resume, await client.getContactById(number));
                break;
            // General Surgery
            case "115":
            case "125":
                schedule[`${number}`].resume += "Cirurgias Gerais.\n";
                schedule[`${number}`].historico.push("general_surgery");
                await client.sendMessage(number, menuGeneralSurgery());
                break;
            // General surgery animal hospitalized
            case "1151":
            case "1251":
                await client.sendMessage(number, menu_go_to_back());
                schedule[`${number}`].resume += "Animal internado.\n";
                schedule[`${number}`].historico.push("animal_hospitalized");
                break;
            // General surgery animal hospitalized with take back service
            case "11511":
                schedule[`${number}`].address = true;
                schedule[`${number}`].resume += "Serviço leva e traz\n";
                schedule[`${number}`].historico.push("take_back_service");
                await client.sendMessage(number, menu_go_to_back_answer());
                break;
            // General surgery animal hospitalized without take back service
            case "11512":
                schedule[`${number}`].resume += `Serviço de leva e traz negado.\n`;
                schedule[`${number}`].resume += `Conversa completa as ${new Date().toLocaleString()}`;
                schedule[`${number}`].historico.push("complete");
                schedule[`${number}`].complete = true;
                await client.sendMessage(number, menuFinish());
                await completeConversation(client, schedule[`${number}`].resume, await client.getContactById(number));
                break;
            // General surgery without animal hospitalized
            case "1152":
            case "1252":
                schedule[`${number}`].resume += "Sem animal internado\n";
                schedule[`${number}`].historico.push("take_back_service");
                await client.sendMessage(number, menu_go_to_back());
                break;
            // General surgery with take back service
            case "11521":
            case "12521":
                schedule[`${number}`].resume += "Serviço leva e traz\n";
                schedule[`${number}`].historico.push("take_back_service");
                await client.sendMessage(number, menu_go_to_back_answer());
                schedule[`${number}`].address = true;
                break;
            // General surgery without take back service
            case "11522":
            case "12522":
                schedule[`${number}`].resume += `Sem serviço de leva e traz\n`;
                schedule[`${number}`].resume += `Conversa completa as ${new Date().toLocaleString()}`;
                schedule[`${number}`].historico.push("complete");
                schedule[`${number}`].complete = true;
                await client.sendMessage(number, menuFinish());
                await completeConversation(client, schedule[`${number}`].resume, await client.getContactById(number));
                break;
            default:
                await client.sendMessage(number, wrongAnswer());
                delete schedule[`${number}`];
                break;
        }
    }
}
exports.messenger = messenger;
async function completeConversation(client, resume, contact) {
    await client.sendMessage(client.info.wid._serialized, resume);
    await client.sendMessage(client.info.wid._serialized, contact);
    return;
}
function finishConversation() {
    let message = "Obrigado por entrar em contato, qualquer dúvida estaremos a sua disposição basta falar um 'oi' aqui nesse número.";
    return message;
}
function wrongAnswer() {
    let message = "Parece que sua resposta não esta dentro dos parâmetros que informamos anteriormente, poderia nos mandar 'oi' para começarmos de novo por gentileza";
    return message;
}
function newClient(number) {
    if (schedule[`${number}`]) {
        if (schedule[`${number}`].time <= Date.now()) {
            schedule[`${number}`] = {
                waiting: false,
                complete: false,
                level: "1",
                new: true,
                castration: false,
                address: false,
                hour: false,
                number,
                resume: `Inicio ${dayjs_1.default(new Date(Date.now() - 1000 * 60 * 60 * 3).toLocaleString(undefined, { hour12: false }))}\n\n`,
                historico: ["start"],
                time: addDays(daysToReturn),
            };
            return true;
        }
        schedule[`${number}`].new = false;
        return false;
    }
    else {
        const contact = {
            waiting: false,
            complete: false,
            level: "1",
            new: true,
            castration: false,
            address: false,
            hour: false,
            number,
            resume: `Inicio ${dayjs_1.default(new Date(Date.now() - 1000 * 60 * 60 * 3).toLocaleString(undefined, { hour12: false })).format("DD/MM/YYYY - HH:mm")}\n\n`,
            historico: ["start"],
            time: addDays(daysToReturn),
        };
        schedule[`${number}`] = contact;
        return true;
    }
}
function menuFinish() {
    let message = "Obrigado pelas informações, atenderemos você o mais brevemente possível!";
    return message;
}
function menu() {
    let message = `Olá, tudo bem? 😊\n`;
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
    let message = "Qual tipo de serviço você precisa?\n";
    message += "1 - Castração\n";
    message += "2 - Vacinas\n";
    message += "3 - Banho e tosa\n";
    message += "4 - Consultas\n";
    message += "5 - Cirurgias gerais\n\n";
    message += "Digite 0 para encerrar a conversa.";
    return message;
}
function menu_go_to_back() {
    let message = "Você deseja nosso serviço de leva e traz 🚗  para seu pet? 🐾\n";
    message += "1 - Sim\n";
    message += "2 - Não\n\n";
    message += "Digite 0 para encerrar a conversa.";
    return message;
}
function menu_go_to_back_answer() {
    let message = "Por favor nos informe o seu endereço ou nos mande a localização de sua casa para calcularmos o valor.";
    return message;
}
function menu_shower(type) {
    let message = `Agora por favor poderia nos informar o porte do seu ${type === "cat" ? "gato" : "cachorro"}:\n`;
    if (type === "cat") {
        message += "1 - pequeno: até 2 kg\n";
        message += "2 - médio: 3 a 5kg\n";
        message += "3 - grande: acima de 6kg\n\n";
    }
    else if (type === "dog") {
        message += "1 - pequeno: até 6kg\n";
        message += "2 - médio: 7 a 15kg\n";
        message += "3 -grande: acima de 15kg\n\n";
    }
    message += "Digite 0 para encerrar a conversa aqui caso queira.";
    return message;
}
function menuShowerSecundary() {
    let message = "Que tipo de tosa você gostaria?\n";
    message += "1 - Para tosa higiência\n";
    message += "2 - Para tosa completa\n\n";
    message += "Digite 0 para encerrar a conversa aqui caso queira.";
    return message;
}
function menuConsults() {
    let message = "Nosso atendimento ocorre de segunda-feira à sábado, das 8h às 17h! Qual é a sua melhor disponibilidade de horário?";
    return message;
}
function menu_castration() {
    let message = "Escreva a raça, peso e idade do seu pet separado por virgulas por favor. \n";
    message += "Exemplo: pastor alemão, 30kg, 7 anos";
    return message;
}
function menuGeneralSurgery() {
    let message = "Você possui algum animal internado conosco?\n";
    message += "1 - Sim\n";
    message += "2 - Não\n\n";
    message += "Digite 0 para encerrar a conversa.";
    return message;
}
