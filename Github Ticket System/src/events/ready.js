import register_commands from "../utils/test/register_commands.js"
import { joinVoiceChannel } from '@discordjs/voice';

export default client => {

    client.once("ready", async (oldState, newState) => {
      
        register_commands(client, "global")
        const liste = [
            `${client.user.tag} Bot Başladı`,
            `${client.user.tag} Bugün Şanslı Gününde`,
            `${client.user.tag} İş Başlasın`,
            `${client.user.tag} Bana Neler Ekledin Patron`,
            `${client.user.tag} En İyi Bot Benim`
        ]

        const random = liste[Math.floor(Math.random() * liste.length)];

        console.log(`${random}`)

        const channelId = "1082013096048070657"
        const channel = client.channels.cache.get(channelId)
        if (channel) {
          channel.send(`<:discord_online:1082013665227706488> Active! **${client.user.tag}**`)
        } else {
          console.log(`Kanal bulunamadı: ${channelId}`)
        }


    })
}