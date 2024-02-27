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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("@mtkruto/node");
const storage_local_storage_1 = require("@mtkruto/storage-local-storage");
const mongoose_1 = __importDefault(require("mongoose"));
//import saveFile from "./saveFile"
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = '6232886409:AAH8YTkGE0bqNM5l8-uxfpjoGPoSuJC3DYk';
const apiID = 29033643;
const apiHash = "a8cc5f16eddd5e0083b2534ecd31123c";
const mongo = 'mongodb+srv://sodha123:sodha123@cluster0.ncclx8i.mongodb.net/?retryWrites=true&w=majority';
hello();
function hello() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new node_1.Client(new storage_local_storage_1.StorageLocalStorage(String(`Client1`)), apiID, apiHash);
        const mongose = mongoose_1.default.connect(mongo);
        const inlineSave = mongoose_1.default.model('inlinetesting', new mongoose_1.default.Schema({
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
        }));
        yield client.start(token);
        client.command('index', (ctx) => __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            try {
                const text = ctx.message.text;
                const ChannelId = ctx.message.replyToMessage && ctx.message.replyToMessage.forwardFromChat
                    ? ctx.message.replyToMessage.forwardFromChat.id
                    : null;
                const chatid = ctx.message.chat.id;
                const botID = ctx.me.id;
                const NumberBtn = Number(text.replace('/index ', ''));
                const msgId = ctx.message.replyToMessage.forwardId ? ctx.message.replyToMessage.forwardId : null;
                console.log(msgId);
                let arr = [];
                let finishTo = 0;
                for (let i = msgId; i >= finishTo; i--) {
                    arr.push(i);
                }
                console.log(arr);
                const getAll = yield client.getMessages(ChannelId, arr);
                console.log(getAll);
                try {
                    for (var _d = true, getAll_1 = __asyncValues(getAll), getAll_1_1; getAll_1_1 = yield getAll_1.next(), _a = getAll_1_1.done, !_a; _d = true) {
                        _c = getAll_1_1.value;
                        _d = false;
                        let get = _c;
                        const file = get.document;
                        const caption = get.caption;
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
                        const db = yield inlineSave.create(media);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = getAll_1.return)) yield _b.call(getAll_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                console.log('completed success');
            }
            catch (error) {
                console.log(error);
            }
        }));
        client.on('inlineQuery', (ctx) => __awaiter(this, void 0, void 0, function* () {
            try {
                let query = ctx.inlineQuery.query;
                console.log('queery is ', query);
                let filename = query.replace('', "").trim();
                const file = yield inlineSave.find({ fileName: { $regex: query, $options: 'i' } }).limit(49);
                const results = file.map((file, index) => ({
                    id: crypto.randomUUID(),
                    type: "document",
                    documentFileId: file.fileId,
                    title: file.fileName,
                    description: 'b',
                }));
                console.log(results);
                yield ctx.answerInlineQuery(results);
            }
            catch (error) {
                console.log(error);
            }
        }));
    });
}
