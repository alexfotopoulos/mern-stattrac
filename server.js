const express = require("express")
const axios = require("axios")
const cors = require("cors")
const PORT = process.env.PORT || 8000
const path = require("path")
require("dotenv").config()

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
fetchPlayerData();

//when frontend calls the following route
app.get("/playerData", async (req, res) => {
    //backend responds with data collected from fantasydata.com
    res.json(playerData)
})

//serve static assets if in production
if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

//backend is listening on port 8000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})