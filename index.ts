import { Client, Composer } from "@mtkruto/node"
import { StorageLocalStorage } from "@mtkruto/storage-local-storage"
import mongoose from 'mongoose'
import schemaFile from "./model"
//import saveFile from "./saveFile"
import dotenv from 'dotenv';
dotenv.config();


const token = '6232886409:AAH8YTkGE0bqNM5l8-uxfpjoGPoSuJC3DYk'

const apiID = 29033643

const apiHash = "a8cc5f16eddd5e0083b2534ecd31123c"

const mongo = 'mongodb+srv://sodha123:sodha123@cluster0.ncclx8i.mongodb.net/?retryWrites=true&w=majority'

hello()

async function hello() {
    const client = new Client(new StorageLocalStorage(String(`Client1`)), apiID, apiHash);

    const mongose = mongoose.connect(mongo)

    const inlineSave = mongoose.model('inlinetesting', new mongoose.Schema(
        {
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
        }
    )
    )


    await client.start(token);

    client.command('index', async (ctx: any) => {

        try {
            const text = ctx.message.text

            const ChannelId = ctx.message.replyToMessage && ctx.message.replyToMessage.forwardFromChat
                ? ctx.message.replyToMessage.forwardFromChat.id
                : null;

            const chatid = ctx.message.chat.id
            const botID = ctx.me.id
            const NumberBtn = Number(text.replace('/index ', ''))

            const msgId = ctx.message.replyToMessage.forwardId ? ctx.message.replyToMessage.forwardId : null

            console.log(msgId)

            let arr = []
            let finishTo = 0
            for (let i = msgId; i >= finishTo; i--) {
                arr.push(i)
            }
            console.log(arr)

            const getAll = await client.getMessages(ChannelId, arr)
            console.log(getAll)

            for await (let get of getAll) {
                const file = get.document
                const caption = get.caption

                const file_name = file.fileName.replace(/[_\-\.+]/g, ' ');
                const media = {
                    fileName: file_name,
                    fileSize: file.fileSize,
                    fileId: file.fileId,
                    fileUniqueId: file.fileUniqueId,
                    fileType: file.fileType,
                    mimeType: file.mimeType,
                    caption: caption,
                }
                const db = await inlineSave.create(media)
            }

            console.log('completed success')
        } catch (error) {
            console.log(error)
        }




    })

    client.on('inlineQuery', async (ctx) => {
        try {

            let query = ctx.inlineQuery.query;
            console.log('queery is ', query)
            let filename = query.replace('', "").trim()

            const file: any = await inlineSave.find({ fileName: { $regex: query, $options: 'i' } }).limit(49)


            const results = file.map((file: any, index: any) => ({
                id: crypto.randomUUID(),
                type: "document",
                documentFileId: file.fileId,
                title: file.fileName,
                description: 'b',
            }));

            console.log(results)

            await ctx.answerInlineQuery(results)
        } catch (error) {
            console.log(error)
        }


    })
}
