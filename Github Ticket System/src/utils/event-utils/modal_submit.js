import suggestion from "../modals/suggestion.js"
import ticket from "../modals/ticket.js"

export default interaction => {

    if (interaction.customId == "suggestion") suggestion(interaction)
    if (interaction.customId == "ticketModals") ticket(interaction)

}