const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    party: { type: String, required: true },
    position: { type: String, enum: ["minister", "formand"], required: true },
    startDate: { type: Date }
});

module.exports = mongoose.model("Person", personSchema);