import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js"
import { t } from "i18next"

const done_emoji = process.env.done_emoji
const error_emoji = process.env.error_emoji

export default async interaction => {

    const title = interaction.components[0].components[0].value
    const details = interaction.components[1].components[0].value

    const userEmbed = new MessageEmbed()
        .setTitle(`${t("suggestion.success_title", { lng: interaction.locale })}`)
        .setDescription(t("suggestion.success_description", { lng: interaction.locale }))
        .setColor("GREEN")

    interaction.reply({ embeds: [userEmbed], ephemeral: true })

    const logEmbed = new MessageEmbed()
        .setTitle(title)
        .setDescription(details)
        .setColor("GREEN")
        .setFooter({ text: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })

    interaction.client.shard.broadcastEval((c, logEmbed ) => {
        const channel = c.channels.cache.get(process.env.SUGGESTION_CHANNEL_ID)
        if (channel) channel.send({ embeds: [logEmbed] })
    }, { context: logEmbed })
}