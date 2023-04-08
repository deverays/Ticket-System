import guilds_Schema from "./guilds_Schema.js";

export const fetch = async (guild_id) => {
    let guild_db = await guilds_Schema.findOne({ guild_id })

    if (guild_db) return guild_db
    else {
        guild_db = new guilds_Schema({ guild_id })

        await guild_db.save()
        return guild_db
    }
}

export const fetchAll = async (filter = {}) => {
    const guild_db = await guilds_Schema.find(filter)
    return guild_db
}

export const update = async (guild_id, update_value) => {
    await guilds_Schema.updateOne({ guild_id }, update_value, { upsert: true })
}

export const deleteOne = async (guild_id) => {
    guilds_Schema.deleteOne({ guild_id })
}