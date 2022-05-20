const express = require("express");
const router = express.Router();

const favoritesControllers = require("../controllers/favoritesControllers")

//route to fetch favorites
router.get("/", favoritesControllers.fetchFavorites)

//route to add to favorites
router.post("/", favoritesControllers.addToFavorites)

//route to delete from favorites
router.delete("/", favoritesControllers.deleteFromFavorites)

module.exports = router