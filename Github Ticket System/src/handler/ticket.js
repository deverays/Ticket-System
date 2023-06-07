import { MessageActionRow, MessageButton, MessageEmbed, Modal, TextInputComponent } from "discord.js";
import guilds_Schema from "../utils/database/guilds_Schema.js"
import { t } from "i18next";
import fs from "fs"

const main_color = process.env.main_color
export default client => {
    let createdChannel;
    client.on("interactionCreate", async (interaction) => {
        if (interaction.customId == "ticketAuthority") {
            const schemax = await guilds_Schema.findOne({ guild_id: interaction.guild.id });
            if (!schemax) {
                return;
            }
            const roleId = schemax?.ticket_role_id;
            const rol = interaction.guild.roles.cache.get(roleId);
            if (!rol) {
                return;
            }
            await interaction.guild.roles.fetch(roleId);
            const kullaniciListesi = rol.members.map(member => `${member.user.tag} (${member.user.id})`).join('\n');
            
            const embed = new MessageEmbed()
                .setColor("#2C2F33")
                .setDescription(`<@&${rol.id}> ${t("ticket.text.roleChannel", { lng: interaction.locale })}\n \`\`\`${kullaniciListesi}\`\`\``)
                .setTimestamp();
            
            interaction.reply({embeds: [embed], ephemeral: true });
        }
        if (interaction.customId == "ticketCreate") {
            const modal = new Modal()
            .setCustomId("ticketModals")
            .setTitle(`Ticket ${interaction.guild.name}`)
            .setComponents(
                new MessageActionRow()
                    .setComponents(
                        new TextInputComponent()
                            .setCustomId("details")
                            .setLabel(`${t("ticket.modals.description", { lng: interaction.locale })}`)
                            .setMinLength(5)
                            .setMaxLength(4000)
                            .setPlaceholder(`${t("ticket.modals.descriptionPlace", { lng: interaction.locale })}`)
                            .setRequired(true)
                            .setStyle("PARAGRAPH")
                    )
            )

        interaction.showModal(modal)
        }
        if (interaction.customId === "ticketMessageLog") {
            const channel = interaction.channel;
            if (channel.isText()) {
                const messages = await channel.messages.fetch();
                let messageContent = '';
                messages.forEach(message => {
                    messageContent += `${message.author.tag}: ${message.content}\n`;
                });
                fs.writeFileSync('mesajlar.txt', messageContent);
                await interaction.reply({ 
                    files: [{
                        attachment: 'mesajlar.txt',
                        name: 'mesajlar.txt'
                    }],
                    ephemeral: true
                });
            } else {
                return;
            }
        }
        
        if (interaction.customId == "ticketVoice") {
            const schemax = await guilds_Schema.findOne({ guild_id: interaction.guild.id });
            const categoryTicetId = schemax?.ticket_category_id;
            const role = schemax?.ticket_role_id;
            const channel = interaction.guild.channels.cache.get(interaction.channelId);
            const userID = channel.topic;
            const categoryId = categoryTicetId
            const guild = client.guilds.cache.get(`${interaction.guild.id}`);
            const channelManager = guild.channels;
            const textChannel = interaction.guild.channels.cache.get(interaction.channelId);
            createdChannel = await channelManager.create(`${interaction.user.username}` + "_voice", {
              type: 'GUILD_VOICE',
              permissionOverwrites: [
                  {
                      id: guild.roles.everyone,
                      deny: ["VIEW_CHANNEL", "CONNECT"],
                  },
                  {
                      id: userID,
                      allow: ["VIEW_CHANNEL", "CONNECT"],
                  },
                  {
                      id: role,
                      allow: ["VIEW_CHANNEL", "CONNECT"],
                  }
              ],
              parent: categoryId
            });
            const buton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setEmoji("<:userCard:1093941120947474442>")
                .setStyle("SECONDARY")
                .setCustomId("ticketUserCard"),
              new MessageButton()
                .setEmoji("<:alet:1094232536042983514>")
                .setStyle("SECONDARY")
                .setCustomId("ticketAuthority"),
              new MessageButton()
                .setEmoji("<:DosyaDoris:1093912292657221722>")
                .setStyle("SECONDARY")
                .setCustomId("ticketMessageLog"),
              new MessageButton()
                .setEmoji("<:ses1:1091001515319246919>")
                .setStyle("SECONDARY")
                .setCustomId("ticketVoiceX"),
                new MessageButton()
                .setLabel("❌")
                .setStyle("SECONDARY")
                .setCustomId("ticketClose1"),
            );
          interaction.update({ components: [buton] });
            } 
              if (interaction.customId == "ticketVoiceX") {
                const buton = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setEmoji("<:userCard:1093941120947474442>")
                    .setStyle("SECONDARY")
                    .setCustomId("ticketUserCard"),
                  new MessageButton()
                    .setEmoji("<:alet:1094232536042983514>")
                    .setStyle("SECONDARY")
                    .setCustomId("ticketAuthority"),
                  new MessageButton()
                    .setEmoji("<:DosyaDoris:1093912292657221722>")
                    .setStyle("SECONDARY")
                    .setCustomId("ticketMessageLog"),
                  new MessageButton()
                    .setEmoji("<:ses:1091000584561242134>")
                    .setStyle("SECONDARY")
                    .setCustomId("ticketVoice"),
                    new MessageButton()
                    .setLabel("❌")
                    .setStyle("SECONDARY")
                    .setCustomId("ticketClose1"),
                );
                interaction.update({ components: [buton] })
                if (createdChannel) {
                  await createdChannel.delete()
                }
              }              
        if (interaction.customId == "ticketClose1") {
            const schemax = await guilds_Schema.findOne({ guild_id: interaction.guild.id });
            const roleIdTicket = schemax?.ticket_role_id;
            const member = interaction.member;
            const roleId = roleIdTicket;
    
            if (member.roles.cache.has(roleId)) {
                const embed = new MessageEmbed()
                    .setDescription(t("ticket.text.deleteChannel", { lng: interaction.locale }))
                    .setColor(`${main_color}`);
    
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('✓')
                            .setStyle('SUCCESS')
                            .setCustomId('ticketClose'),
                        new MessageButton()
                            .setLabel('X')
                            .setStyle('DANGER')
                            .setCustomId('ticketXDelete')
                    );
    
                await interaction.reply({ embeds: [embed], components: [row] });
            } else {
                return;
            }
        }
        if (interaction.customId == "ticketXDelete") {
            interaction.message.delete()
        }
        if (interaction.customId == "ticketUserCard") {
            const channel = interaction.guild.channels.cache.get(interaction.channelId);
            const userID = channel.topic;
            const accountCreationDate = interaction.user.createdAt;
            const embed = new MessageEmbed()
            .setTitle(t("ticket.text.userCardTitle", { lng: interaction.locale }) + " " + interaction.user.username)
            .addFields(
                { name: t("ticket.text.userCardNickname", { lng: interaction.locale }), value: `<@${userID}>`, inline: false },
                { name: t("ticket.text.userCardID", { lng: interaction.locale }), value: `\`\`\`${userID}\`\`\``, inline: false },
                { name: t("ticket.text.userCardTime", { lng: interaction.locale }), value: `\`\`\`${accountCreationDate}\`\`\``, inline: false }
            )
            .setColor(`#2C2F33`)
            .setThumbnail(interaction.user.displayAvatarURL({ format: 'png' }))
            interaction.reply({ embeds: [embed], ephemeral: true })
        }
        if (interaction.customId == "ticketClose") {
            interaction.message.delete();
            const beta = process.env.beta_color
          
            const embed = new MessageEmbed()
              .setDescription(`${t("ticket.text.deleteChannelDone", { lng: interaction.locale })} <@${interaction.user.id}>`)
              .setColor(`${beta}`);
            await interaction.reply({ embeds: [embed] });

            const schemax = await guilds_Schema.findOne({ guild_id: interaction.guild.id });
            const roleIdTicket = schemax?.ticket_role_id;
            const member = interaction.member;
            const roleId = roleIdTicket;
            if (member.roles.cache.has(roleId)) {
            setTimeout(() => {
              interaction.channel.delete();
              if (createdChannel) {
                 createdChannel.delete()
              }
            }, 3000);
        }
        }
    })
}