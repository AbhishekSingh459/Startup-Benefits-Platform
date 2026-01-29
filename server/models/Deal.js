const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
    {
        partnerName: String,
        logo: String,
        title: String,
        description: String,
        category: String,
        value: String,
        fullDetails: String,
        eligibility: String,
        instructions: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);