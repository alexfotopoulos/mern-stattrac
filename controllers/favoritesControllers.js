const Favorite = require("../models/Favorite");
const User = require("../models/User");
const HttpError = require("../models/HttpError");

//controller to fetch all favorites
const fetchFavorites = async (req, res, next) => {
    //create variable to hold favorites
    let favorites;

    //capture userId from request headers
    const userId = req.get("userId");

    //locate user and populate favorites into the favorites variable
    try {
        favorites = await User.findById(userId).populate("favorites");
    } catch (err) {
        return next(new HttpError("Could not fetch favorites. Try again later", 500));
    };

    //if there are no favorites
    if (!favorites) {
        return next(new HttpError("No favorites found for user", 500));
    };

    //if user has favorites which are located, send array of favorites
    res.send(favorites.favorites.map(fave => fave));
};
//controller to add to favorites
const addToFavorites = async (req, res, next) => {
    //destructure favorite from req.body
    let { favorite } = req.body;

    //capture userId from request headers
    const userId = req.get("userId");

    //create a new Favorite and save
    let newFavorite;
    try {
        newFavorite = new Favorite({ name: favorite, user: userId });
        await newFavorite.save();
    } catch (err) {
        return next(new HttpError("Could not add to favorites. Try again later", 500));
    };

    //add favorite to the user
    try {
        let user = await User.findById(userId);
        user.favorites.push(newFavorite);
        await user.save();
    } catch (err) {
        return next(new HttpError("Could not add to favorites. Try again later", 500));
    };

    //send response to confirm success
    res.status(201).json({ favorite: newFavorite });
};
//controller to delete from favorites
const deleteFromFavorites = async (req, res, next) => {
    //destructure teamId and favorite from req.body
    let { teamId, favorite } = req.body;

    //capture userId from request headers
    const userId = req.get("userId");

    //delete favorite from favorites collection and favorite from the user's favorites array
    try {
        let favorite = await Favorite.findByIdAndDelete({ _id: teamId }).populate("user");
        favorite.user.favorites.pull(favorite);
        await favorite.user.save();
    } catch (err) {
        return next(new HttpError("Could not remove from favorites. Try again later", 500));
    };

    //send response to confirm success
    res.status(200).json({ deletedFavorite: favorite });
};

exports.fetchFavorites = fetchFavorites;
exports.addToFavorites = addToFavorites;
exports.deleteFromFavorites = deleteFromFavorites;