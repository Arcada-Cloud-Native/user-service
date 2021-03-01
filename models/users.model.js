const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    town: { type: String, required: true },
    state: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    zipCode: { type: String, required: true },
    password: { type: String, required: true, select: false },
});

module.exports = mongoose.model("User", userSchema);
