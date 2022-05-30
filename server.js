const express = require("express")
const mongoose = require("mongoose")
const axios = require("axios")
const cors = require("cors")
const PORT = process.env.PORT || 8000
const path = require("path")
require("dotenv").config()
const favoritesRoutes = require("./routes/favoritesRoutes")
const usersRoutes = require("./routes/usersRoutes")
const HttpError = require("./models/HttpError")

const app = express()
app.use(cors())

//create empty array to store player data from fantasydata.com
let playerData = []
const fetchPlayerData = async () => {
    //call fantasydata API
    let response = await axios.get("https://api.sportsdata.io/api/nfl/fantasy/json/Players", { headers: { "Ocp-Apim-Subscription-Key": process.env.FANTASY_DATA_API_KEY } })
    //save response data to playerData array
    playerData = response.data
};
// fetchPlayerData();

app.use(express.json())

app.use('/favorites', favoritesRoutes)
app.use('/users', usersRoutes)

//when frontend calls the following route
app.get("/playerData", async (req, res) => {
    //backend responds with data collected from fantasydata.com
    res.json(playerData)
})

//for any route that does match above
app.use((req, res, next) => {
    throw new HttpError("Could not find this route.", 404)
});

//customer error handler
app.use((err, req, res, next) => {
    const { status = 500, message = "An unknown error occurred" } = err;
    res.status(status).send(message);
});

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

//connect to mongo database
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.tnlau.mongodb.net/test?retryWrites=true&w=majority`)
    .then(
        //backend is listening on port 8000 in development
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        }))
    .catch(err => {
        console.log(err)
    })