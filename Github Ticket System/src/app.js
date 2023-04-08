import { Client, Collection } from "discord.js"
import { readdirSync } from "fs"
import i18next from "i18next"
import translationBackend from "i18next-fs-backend";
import mongoose from "mongoose"
import * as database from "./utils/database/mongoose_methods.js"
import emoji_list from "./emoji_list.js"
import 'dotenv/config'

const client = new Client({
    intents: 3276799
})

client.commands = new Collection()
client.emoji = (emojiName) => emoji_list[emojiName] || "🎉"
client.embed = await import("./utils/bot/embed.js").then(m => m.default)
client.database = database
  

await mongoose.connect("mongodb+srv://eray:b100dy50@cluster0.m4zwaea.mongodb.net/test")

await i18next
    .use(translationBackend)
    .init({
        ns: readdirSync("./locales/en-US").map(a => a.replace(".json", "")),
        defaultNS: "commands",
        fallbackLng: "en-US",
        preload: readdirSync("./locales"),
        backend: {
            loadPath: "./locales/{{lng}}/{{ns}}.json"
        }
    })

readdirSync("./events").forEach(async file => {
    const event = await import(`./events/${file}`).then(m => m.default)
    event(client)
})

readdirSync("./handler").forEach(async file => {
    const event = await import(`./handler/${file}`).then(m => m.default)
    event(client)
})

readdirSync("./commands").forEach(category => {
    readdirSync(`./commands/${category}`).forEach(async file => {
        const command = await import(`./commands/${category}/${file}`)
        client.commands.set(command.data.name, command)
    })
})

client.login(process.env.token)