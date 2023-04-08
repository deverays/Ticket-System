import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import guilds_Schema from "../../utils/database/guilds_Schema.js"
import { t } from "i18next";

const main_color = process.env.main_color

export const data = {
  name: t("ticket.name"),
  description: t("ticket.description"),
  permission: "ADMINISTRATOR",
  cooldown: 10,
  async execute(interaction) {

    const done_color = process.env.done_color
    const main_color = process.env.main_color
    const done_emoji = process.env.done_emoji

    const sub_command = interaction.options.getSubcommand()
    if (sub_command == "set") {
      const channel = interaction.options.getChannel("channel")
      const category = interaction.options.getChannel("category")
      const role = interaction.options.getRole("role")

      await guilds_Schema.updateOne({ guild_id: interaction.guild.id }, { $set: { ticket_category_id: category.id, ticket_role_id: role.id } }, { upsert: true })

      interaction.reply({
        embeds: [{
          description: `${done_emoji} ${t("ticket.text.setting", { lng: interaction.locale })} \n **Ticket** ${interaction.guild.name} <#${channel.id}>`,
          color: `${done_color}`
        }]
      })

      const text = interaction.options.getString("text") || "Please do not open a ticket unnecessarily."

      const ticketEmbed = new MessageEmbed()
      .setTitle(interaction.guild.name)
      .setDescription(`${text}`)
      .setFooter({ text: interaction.guild.name })
      .setColor(`${main_color}`)
      const ticketButon = new MessageActionRow()
      .setComponents(
        new MessageButton()
        .setLabel(`Ticket ${interaction.guild.name}`)
        .setStyle("SUCCESS")
        .setCustomId("ticketCreate")
      )
      channel.send({ embeds: [ticketEmbed], components: [ticketButon]})
    }
    else if (sub_command == "reset") {
      await guilds_Schema.updateOne({ guild_id: interaction.guild.id }, { $set: { ticket_category_id: null, ticket_role_id: null } }, { upsert: true })

      interaction.reply({
        embeds: [{
          description: `${done_emoji} ${t("ticket.text.reset", { lng: interaction.locale })}`,
          color: `${done_color}`
        }]
      })
    }
  }
}
export const slash_data = {
  name: data.name,
  description: data.description,
  name_localizations: {
    tr: t("ticket.name", { lng: "tr" })
},
description_localizations: {
    tr: t("ticket.description", { lng: "tr" })
},
  options: [
    {
      name: "set",
      description: "Sets the news channel.",
      name_localizations: {
        tr: t("ticket.setting.name", { lng: "tr" })
    },
    description_localizations: {
        tr: t("ticket.setting.description", { lng: "tr" })
    },
      type: 1,
      options: [
        {
          name: "channel",
          description: "Select the channel.",
          name_localizations: {
            tr: t("ticket.setting.channel.name", { lng: "tr" })
        },
        description_localizations: {
            tr: t("ticket.setting.channel.description", { lng: "tr" })
        },
          type: 7,
          channel_types: [0],
          required: true
        },
        {
          name: "text",
          description: "Please enter a text.",
          name_localizations: {
            tr: t("ticket.setting.text.name", { lng: "tr" })
        },
        description_localizations: {
            tr: t("ticket.setting.text.description", { lng: "tr" })
        },
          type: 3
        },
        {
          name: "role",
          description: "Please select a role",
          name_localizations: {
            tr: t("ticket.setting.role.name", { lng: "tr" })
        },
        description_localizations: {
            tr: t("ticket.setting.role.description", { lng: "tr" })
        },
          type: 8
        },
        {
          name: "category",
          description: "Please select a category.",
          name_localizations: {
            tr: t("ticket.setting.category.name", { lng: "tr" })
        },
        description_localizations: {
            tr: t("ticket.setting.category.description", { lng: "tr" })
        },
          type: 7,
          channel_types: [4],
        },
      ]
    },
    {
      name: "reset",
      description: "Resets the news channel.",
      name_localizations: {
        tr: t("ticket.reset.name", { lng: "tr" })
    },
    description_localizations: {
        tr: t("ticket.reset.description", { lng: "tr" })
    },
      type: 1
    }
  ]
};