"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemaFile = new mongoose_1.default.Schema({
    fileName: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true
    },
    fileId: {
        type: String,
        required: true,
    },
    fileUniqueId: {
        type: String,
        unique: true,
        required: true
    },
    fileType: {
        type: String,
        default: null,
        required: false
    },
    mimeType: {
        type: String,
        default: null,
        required: false
    },
    caption: {
        type: String,
        default: null,
        required: false
    }
});
exports.default = schemaFile;
