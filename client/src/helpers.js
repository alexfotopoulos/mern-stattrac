import axios from "axios";

//list of player statuses for which players should be returned
const statusList = ["Active", "Injured Reserve", "Physically Unable to Perform", "Practice Squad", "Suspended", "Non Football Injury", "Non-Football Illness", "Commissioner Exempt List", "Exempt/Left Team", "Paternity", "Bereavement", "Reserve/COVID-19", "Voluntary Opt Out"];

//helper function to fetch the applicable college teams
export async function fetchTeamData() {
    //backend API
    let res = await axios.get("/playerData");
    //create array to hold the active teams
    let activeTeams = [];
    //iterate through API response
    for (let player of res.data) {
        //if the player is an applicable status and went to a US college
        if (statusList.includes(player.Status) && player.College !== "None") {
            //push team to activeTeams array
            activeTeams.push(player.College.trim());
        };
    };
    //delete duplicates from activeTeams array
    activeTeams = [...new Set(activeTeams)];
    activeTeams.sort();
    //return teams
    return activeTeams;
};

//helper function to fetch the applicable players
export async function fetchPlayerData(selectedTeam) {
    //backend API
    let res = await axios.get("/playerData");
    //create array to hold the active players
    let activePlayers = [];
    //iterate through API response
    for (let player of res.data) {
        //create new player object
        let playerInfo = {};
        //if the player is an applicable status and went to the selected team
        if (statusList.includes(player.Status) && player.College === selectedTeam) {
            //add the following elements to playerInfo object
            playerInfo.team = player.Team;
            playerInfo.firstName = player.FirstName;
            playerInfo.lastName = player.LastName;
            playerInfo.position = player.Position;
            playerInfo.status = player.Status;
            playerInfo.college = player.College;
            if (player.Experience === null) {
                playerInfo.experience = 0;
            } else {
                playerInfo.experience = player.Experience;
            };
            //push player to activePlayers array
            activePlayers.push(playerInfo);
        };
    };
    //sort players alphabetically
    activePlayers.sort(alphabetize);
    //return players
    return activePlayers;
};

//mapping of NFL teams from data received from fantasydata API to pro football reference to loop up player stats
export const teamPairs =
{
    BUF: "buf",
    MIA: "mia",
    NE: "nwe",
    NYJ: "nyj",
    TEN: "oti",
    IND: "clt",
    HOU: "htx",
    JAX: "jax",
    CIN: "cin",
    CLE: "cle",
    BAL: "rav",
    PIT: "pit",
    DEN: "den",
    LV: "rai",
    LAC: "sdg",
    KC: "kan",
    DAL: "dal",
    WAS: "was",
    NYG: "nyg",
    PHI: "phi",
    CAR: "car",
    TB: "tam",
    NO: "nor",
    ATL: "atl",
    GB: "gnb",
    CHI: "chi",
    MIN: "min",
    DET: "det",
    ARI: "crd",
    LAR: "ram",
    SEA: "sea",
    SF: "sfo"
};

//function to sort players by last name
function alphabetize(a, b) {
    if (a.lastName < b.lastName) {
        return -1;
    }
    if (a.lastName > b.lastName) {
        return 1;
    }
    return 0;
};