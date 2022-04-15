const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    members: { type: [String], required: true, default: [] },
    owner: { type: String, required: true },
})

module.exports = mongoose.model("Group", groupSchema);