const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    members: { type: [String], required: true, default: [] },
    date: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: String, required: true },
    owner: { type: String, required: true },
})

module.exports = mongoose.model("Event", eventSchema);