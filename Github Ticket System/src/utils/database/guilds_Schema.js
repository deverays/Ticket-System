import mongoose from "mongoose"

export default mongoose.model("guilds", new mongoose.Schema({
    guild_id: { type: String, unique: true, required: true },
    test: { type: String, default: "test" },
    ticket_category_id: { type: String, default: null },
    ticket_role_id: { type: String, required: true },
}))