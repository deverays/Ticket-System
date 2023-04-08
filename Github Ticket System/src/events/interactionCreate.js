import cooldown_control from "../utils/cooldown_control.js"
import auto_complete from "../utils/event-utils/auto_complete.js"
import modal_submit from "../utils/event-utils/modal_submit.js"
import button_interaction from "../utils/event-utils/button_interaction.js"
import { t } from "i18next"

const done_emoji = process.env.done_emoji
const channel = process.env.moderation_channel
const main_color = process.env.main_color
const error_color = process.env.error_color

const { OWNER_ID } = process.env
export default client => {

    const { embed } = client

    client.on("interactionCreate", async (interaction) => {
        if (interaction.isAutocomplete()) auto_complete(interaction)

        else if (interaction.isModalSubmit()) modal_submit(interaction)
        else if (interaction.isButton()) button_interaction(interaction)
        else if (!interaction.isApplicationCommand()) return

        const command = client.commands.get(interaction.commandName)
        if (!command) return

        // Cooldown Control
        const cooldown = cooldown_control(command, interaction.user.id)
        if (cooldown) return interaction.reply({
            embeds: [
                embed(t("cooldown_error", { ns: "common", lng: interaction.locale, cooldown }), "RED")
            ]
        })

        // Permission Control
        if (command.data.permission && !interaction?.member?.permissions?.has(command.data.permission) && interaction.user.id != OWNER_ID) return interaction.reply({
            embeds: [{
                description: `${interaction.member} ${t("authority", { lng: interaction.locale })}`,
                color: `${error_color}`
            }]
        })

        // Execute Command
        try {
            command.data.execute(interaction)
        } catch (e) {
            interaction.reply({ embeds: [embed(t("unexpected_error", { ns: "common", lng: interaction.locale }), "RED")] })
            console.log(e)
        }
    })

}