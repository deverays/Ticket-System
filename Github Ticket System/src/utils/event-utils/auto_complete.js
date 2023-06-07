export default (interaction) => {

    if (interaction.commandName == "yardım") {

        const focusedValue = interaction.options.getFocused()

        const choices = Array.from(interaction.client.commands.keys())

        const filtered = choices.filter(choice => choice.startsWith(focusedValue))
        const result = filtered.map(choice => ({ name: choice, value: choice }))

        interaction.respond(result)
    }

}