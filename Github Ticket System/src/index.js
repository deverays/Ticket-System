import { ShardingManager } from "discord.js";
import 'dotenv/config'

const manager = new ShardingManager("app.js", { token: process.env.TOKEN })

manager.on("shardCreate", shard => {
    console.log(`Shard ${shard.id} Aktif!`)
})

manager.spawn()
    .then(() => {
        console.log(`Sanırım Çalıştım`)
    })