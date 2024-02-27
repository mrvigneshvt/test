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
Object.defineProperty(exports, "__esModule", { value: true });
const saveFile = (file, caption, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file_name = file.fileName.replace(/[_\-\.+]/g, ' ');
        const media = {
            fileName: file_name,
            fileSize: file.fileSize,
            fileId: file.fileId,
            fileUniqueId: file.fileUniqueId,
            fileType: file.fileType,
            mimeType: file.mimeType,
            caption: caption,
        };
        const db = yield name.create(media);
        if (db) {
            console.log(db);
        }
        else {
            console.log('skipped');
        }
        //console.log(db)
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = saveFile;
