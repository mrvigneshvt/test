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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("@mtkruto/node");
const storage_local_storage_1 = require("@mtkruto/storage-local-storage");
//import saveFile from "./saveFile"
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = '6232886409:AAH8YTkGE0bqNM5l8-uxfpjoGPoSuJC3DYk';
const apiID = 29033643;
const apiHash = "a8cc5f16eddd5e0083b2534ecd31123c";
hello();
function hello() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new node_1.Client(new storage_local_storage_1.StorageLocalStorage(String(`Client1`)), apiID, apiHash);
        yield client.start(token);
        client.on('message:document', (ctx) => __awaiter(this, void 0, void 0, function* () {
            yield ctx.replyDocument(ctx.message.document.fileId);
        }));
    });
}
