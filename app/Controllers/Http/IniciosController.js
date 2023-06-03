"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
class IniciosController {
    async index({ view }) {
        const fs = require('fs');
        const path = require('path');
        const rootDir = path.join(__dirname, '../../../');
        const images = [];
        const ImageRender = [];
        console.log(Application_1.default.tmpPath('home'));
        return;
        const imagearray = fs.readdirSync(rootDir + '/tmp/uploads');
        imagearray.forEach((image) => {
            images.push(image);
        });
        for (let i = 0; i < 25; i++) {
            const image = images[i];
            const img = {
                name: image.split('.')[0],
                url: await Drive_1.default.getSignedUrl(image)
            };
            ImageRender.push(img);
        }
        ;
        shuffleArray(ImageRender);
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return view.render('inicio', { ImageRender });
    }
    async send({ response }) {
        const fs = require('fs');
        const path = require('path');
        const rootDir = path.join(__dirname, '../../../');
        const images = [];
        const ImageRender = [];
        const imagesHome = [];
        const imageHome = [];
        const imagearrayHome = fs.readdirSync(Application_1.default.tmpPath('uploads/home'));
        const imagearray = fs.readdirSync(Application_1.default.tmpPath('uploads/galery'));
        imagearray.forEach((image) => {
            images.push(image);
        });
        imagearrayHome.forEach((image) => {
            imagesHome.push(image);
        });
        for (let i = 0; i < imagesHome.length; i++) {
            const image = imagesHome[i];
            const img = {
                name: image.split('.')[0],
                url: await Drive_1.default.getUrl('home/' + image)
            };
            imageHome.push(img);
        }
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const img = {
                name: image.split('.')[0],
                url: await Drive_1.default.getUrl('galery/' + image)
            };
            ImageRender.push(img);
        }
        shuffleArray(ImageRender);
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return response.json({ ImageRender, imageHome });
    }
}
exports.default = IniciosController;
//# sourceMappingURL=IniciosController.js.map