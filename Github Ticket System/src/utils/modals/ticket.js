import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js"
import guilds_Schema from "../database/guilds_Schema.js"
import { t } from "i18next"

const done_emoji = process.env.done_emoji
const error_emoji = process.env.error_emoji
const error_color = process.env.error_color
const done_color = process.env.done_color

export default async interaction => {

    const details = interaction.components[0].components[0].value

    const schemax = await guilds_Schema.findOne({ guild_id: interaction.guild.id })

    if (schemax) {
        let embed = new MessageEmbed()
        .setDescription(`${t("ticket.text.createUser", { lng: interaction.locale })}`)
        .setColor(`${error_color}`)
    
        if (interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))
        return interaction.reply({ embeds: [embed], ephemeral: true })

                    const guild = interaction.client.guilds.cache.get(`${interaction.guild.id}`);
                    const channelManager = guild.channels;
                    const category = schemax?.ticket_category_id
                    const role = schemax?.ticket_role_id
                    channelManager.create(`${interaction.user.username}` + "_text", {
                      type: 'GUILD_TEXT',
                      permissionOverwrites: [
                          {
                              id: guild.roles.everyone,
                              deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                          },
                          {
                              id: interaction.user.id,
                              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                          },
                          {
                              id: role,
                              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                          }
                      ],
                      parent: category,
                      topic: interaction.user.id
                  })    
                    .then(channel => {
                      const embed = new MessageEmbed()
                        .setDescription(`<@${interaction.user.id}> ${t("ticket.text.createChannel", { lng: interaction.locale })} <#${channel.id}>`)
                        .setColor(`${done_color}`)
                      interaction.reply({ embeds: [embed], ephemeral: true });
                      const channelEmbed = new MessageEmbed()
                        .setTitle(`${interaction.guild.name}`)
                        .setDescription(`${t("ticket.modals.description", { lng: interaction.locale })} \n \`\`\`${details}\`\`\` \n **${t("ticket.language.textText", { lng: interaction.locale })}**\`${t("ticket.language.text", { lng: interaction.locale })}\``)
                        .setColor(`#2C2F33`)
                        .setTimestamp()
                        .setThumbnail(interaction.user.displayAvatarURL())
                        .setFooter({ text: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
                        
                      const buton = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setEmoji("📔")
                            .setStyle("SECONDARY")
                            .setCustomId("ticketUserCard"),
                            new MessageButton()
                            .setEmoji("🛡️")
                            .setStyle("SECONDARY")
                            .setCustomId("ticketAuthority"),
                            new MessageButton()
                            .setEmoji("📁")
                            .setStyle("SECONDARY")
                            .setCustomId("ticketMessageLog"),
                            new MessageButton()
                            .setEmoji("🔊")
                            .setStyle("SECONDARY")
                            .setCustomId("ticketVoice"),
                            new MessageButton()
                            .setLabel("❌")
                            .setStyle("SECONDARY")
                            .setCustomId("ticketClose1"),
                        );
                      channel.send({ content: `<@${interaction.user.id}> **&** <@&${role}>`, embeds: [channelEmbed], components: [buton] })
                        .catch(console.error);
                    })
                    .catch(console.error);
    }
}
