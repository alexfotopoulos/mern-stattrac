const Favorite = require("../models/Favorite");

//controller to fetch all favorites
const fetchFavorites = async (req, res, next) => {
    let favorites
    try {
        favorites = await Favorite.find()
    } catch(err) {
        return next(err)
    }
    if (!favorites) {
        return next(err)
    }
    res.send(favorites.map(fave => fave));
}
//controller to add to favorites
const addToFavorites = async (req, res, next) => {
    let {favorite} = req.body
    let newFavorite = new Favorite({name: favorite})
    try {
        await newFavorite.save()
    } catch(err) {
        return next(err)
    }
    res.status(201).json({ favorite: newFavorite });
}
//controller to delete from favorites
const deleteFromFavorites = async (req, res, next) => {
    let {favorite} = req.body
    try {
        await Favorite.deleteOne({name: favorite})
    } catch(err) {
        return next(err)
    }
    res.status(200).json({ deletedFavorite: favorite });
}

exports.fetchFavorites = fetchFavorites
exports.addToFavorites = addToFavorites
exports.deleteFromFavorites = deleteFromFavorites