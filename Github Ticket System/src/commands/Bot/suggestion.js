import { t } from "i18next";
import { MessageActionRow, Modal, TextInputComponent } from "discord.js"

export const data = {
    name: t("suggestion.name"),
    description: t("suggestion.description"),
    cooldown: 10,
    execute(interaction) {

        const lng = { lng: interaction.locale }

        const modal = new Modal()
            .setCustomId("suggestion")
            .setTitle(t("suggestion.modal.title", lng))
            .setComponents(
                new MessageActionRow()
                    .setComponents(
                        new TextInputComponent()
                            .setCustomId("title")
                            .setLabel(t("suggestion.modal.title_input.label", lng))
                            .setMinLength(5)
                            .setMaxLength(100)
                            .setPlaceholder(t("suggestion.modal.title_input.placeholder", lng))
                            .setRequired(true)
                            .setStyle("SHORT")
                    ),
                new MessageActionRow()
                    .setComponents(
                        new TextInputComponent()
                            .setCustomId("details")
                            .setLabel(t("suggestion.modal.details_input.label", lng))
                            .setMinLength(5)
                            .setMaxLength(4000)
                            .setPlaceholder(t("suggestion.modal.details_input.placeholder", lng))
                            .setRequired(true)
                            .setStyle("PARAGRAPH")
                    )
            )

        interaction.showModal(modal)
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    name_localizations: {
        tr: t("suggestion.name", { lng: "tr" })
    },
    description_localizations: {
        tr: t("suggestion.description", { lng: "tr" })
    }
}