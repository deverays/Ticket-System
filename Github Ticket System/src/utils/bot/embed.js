import { MessageEmbed } from "discord.js"

export default (description, color = "#5f7fcf", title = "") => {

    if (color == "RED") color = "#e64c4c"
    else if (color == "GREEN") color = "#67eb74"
    else if (color == "INFO") color = "#dbd160"

    const response = new MessageEmbed()
        .setDescription(description)
        .setColor(color)
        .setTitle(title)

    return response
}