export default (client, type = "global") => {

    const commands = client.commands.map(command => command.slash_data)

    if (type == "global") {
        client.application.commands.set(commands)
            .then(() => {
                console.log("Global komutlar kaydedildi")
            })
    }
    else if (type == "guild") {
        const guild = client.guilds.cache.get("1081545254802559006")
        guild.commands.set(commands)
            .then(() => {
                console.log("Guild komutları kaydedildi")
            })
    }

}