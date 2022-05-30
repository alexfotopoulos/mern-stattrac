const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;