const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth")

const favoritesControllers = require("../controllers/favoritesControllers")

//protect favorites routes
router.use(checkAuth)

//route to fetch favorites
router.get("/", favoritesControllers.fetchFavorites)

//route to add to favorites
router.post("/", favoritesControllers.addToFavorites)

//route to delete from favorites
router.delete("/", favoritesControllers.deleteFromFavorites)

module.exports = router