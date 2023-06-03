"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const fs = require('fs');
const path = require('path');
const https = require('https');
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class BotInput {
    async BotInput() {
        const token = Env_1.default.get('BOT_token');
        const bot = new node_telegram_bot_api_1.default(token, { polling: true });
        bot.on('photo', async (msg) => {
            const chatId = msg.chat.id;
            const photo = msg.photo[msg.photo.length - 1];
            const fileId = photo.file_id;
            const rootDir = path.join(__dirname, '../../../');
            const directoryPath = path.join(rootDir, 'tmp/uploads/galery');
            const imagearray = await new Promise((resolve, reject) => {
                fs.readdir(directoryPath, function (err, files) {
                    if (err) {
                        reject('Erro ao ler diretório');
                    }
                    let array = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
                    const names = array.map(filename => filename.split('.')[0]);
                    resolve(names);
                });
            });
            const baseName = 'img';
            let num = 1;
            let suffix = generateRandomString(6);
            let newName = `${baseName}-${suffix}`;
            while (imagearray.includes(newName)) {
                num++;
                suffix = generateRandomString(6);
                newName = `${baseName}-${suffix}`;
            }
            function generateRandomString(length) {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return result;
            }
            const fileName = `${newName}.jpg`;
            const file = await bot.getFile(fileId);
            const fileUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
            const directory = Application_1.default.tmpPath('uploads/galery');
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
            const fileStream = fs.createWriteStream(path.join(directory, fileName));
            const req = https.get(fileUrl, async function (res) {
                res.pipe(fileStream);
                bot.sendMessage(chatId, `Imagem salva como: ${fileName}\n\n`, { reply_to_message_id: msg.message_id });
                console.log('Imagem salva como: ' + fileName);
                const url = await Drive_1.default.getUrl('galery/' + fileName);
                const image = {
                    name: fileName.split('.')[0],
                    url: url
                };
                Ws_1.default.io.emit('load', image);
            });
        });
    }
}
exports.default = BotInput;
//# sourceMappingURL=BotInput.js.map