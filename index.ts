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


hello()

async function hello() {
    const client = new Client(new StorageLocalStorage(String(`Client1`)), apiID, apiHash);


    await client.start(token);



    client.on('message:document', async (ctx) => {
        await ctx.replyDocument(ctx.message.document.fileId)

    })
}
