"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UploadsController {
    async upload({ request }) {
        const coverImage = request.file('cover_image');
        await coverImage?.moveToDisk('images');
        await coverImage?.moveToDisk('./');
    }
}
exports.default = UploadsController;
//# sourceMappingURL=UploadsController.js.map