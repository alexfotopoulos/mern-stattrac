const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Favorite"
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;