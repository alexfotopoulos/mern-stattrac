const Favorite = require("../models/Favorite");
const User = require("../models/User");
const HttpError = require("../models/HttpError")

//controller to fetch all favorites
const fetchFavorites = async (req, res, next) => {
    let favorites
    const userId = req.get("userId")
    try {
        favorites = await User.findById(userId).populate("favorites")
    } catch (err) {
        return next(err)
    }
    if (!favorites) {
        return next(err)
    }
    console.log(favorites.favorites)
    res.send(favorites.favorites.map(fave => fave));
}
//controller to add to favorites
const addToFavorites = async (req, res, next) => {
    let { favorite } = req.body
    const userId = req.get("userId")
    let newFavorite = new Favorite({ name: favorite, user: userId })
    try {
        await newFavorite.save()
    } catch (err) {
        return next(err)
    }
    let user = await User.findById(userId)
    user.favorites.push(newFavorite)
    await user.save()
    res.status(201).json({ favorite: newFavorite });
}
//controller to delete from favorites
const deleteFromFavorites = async (req, res, next) => {
    let { teamId, favorite } = req.body
    const userId = req.get("userId")
    try {
        let favorite = await Favorite.findByIdAndDelete({ _id: teamId }).populate("user")
        favorite.user.favorites.pull(favorite)
        await favorite.user.save()
    } catch (err) {
        return next(err)
    }
    res.status(200).json({ deletedFavorite: favorite });
}

exports.fetchFavorites = fetchFavorites
exports.addToFavorites = addToFavorites
exports.deleteFromFavorites = deleteFromFavorites