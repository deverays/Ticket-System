import { Collection } from "discord.js"
const cooldowns = new Collection()

export default (command, user_id) => {

    // if (user_id == process.env.owner_id) return false

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 5) * 1000

    if (timestamps.has(user_id)) {
        const expiration = timestamps.get(user_id) + cooldownAmount
        if (now < expiration) {
            const timeLeft = Math.round((expiration - now) / 1000)
            return timeLeft
        }

        return false
    }
    else {
        timestamps.set(user_id, now)
        setTimeout(() => timestamps.delete(user_id), cooldownAmount)
        return false
    }
}