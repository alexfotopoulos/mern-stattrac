import { createContext, useState, useContext } from "react";
import AuthContext from "./auth-context";
import axios from "axios";

const FavoritesContext = createContext({
    favorites: [],
    refresh: false,
    addFavorite: (data) => { },
    deleteFavorite: (data) => { },
    fetchFavorites: (data) => { },
    toggleRefresh: (data) => { }
});

export function FavoritesContextProvider(props) {
    //consume auth context
    const authCtx = useContext(AuthContext);
    //state to store the favorites
    const [favorites, setFavorites] = useState([]);
    //refresh state to trigger useEffect of Results page when switching from favorite to favorites
    const [refresh, setRefresh] = useState(false);

    //function to fetch favorites from mongoDB and set favorites state
    async function handleFetchFavorites() {
        //get userId from local storage
        const userData = JSON.parse(localStorage.getItem("userData"));

        //fetch favorites from mongo
        try {
            let response = await axios({
                method: "get",
                url: `/favorites`,
                headers: { "Authorization": `Bearer ${authCtx.token}`, userId: userData.userId }
            });
            //create empty array to store team objects consisting of id and name
            let faves = [];
            for (let fave in response.data) {
                //push new object to empty array
                faves.push(response.data[fave]);
            };
            //set favorites to be array of team objects
            setFavorites(faves);
        } catch (err) {
            alert(err.response.data);
        };
    };
    //function to add favorite to mongoDB and favorites state
    async function handleAddFavorite(team) {
        //get userId from local storage
        const userData = JSON.parse(localStorage.getItem("userData"));

        //send request to backend to add favorite to mongo
        try {
            let response = await axios({
                method: "post",
                url: "/favorites",
                data: { favorite: team },
                headers: { "Content-type": "application/json", "Authorization": `Bearer ${authCtx.token}`, userId: userData.userId }
            });
            //create object to add new team to state
            let newTeam = response.data.favorite;
            setFavorites(prevFavorites => [...prevFavorites, newTeam]);
        } catch (err) {
            alert(err.response.data);
        };
    };
    //function to delete favorite from mongoDB and favorites state
    async function handleDeleteFavorite(team) {
        //get userId from local storage
        const userData = JSON.parse(localStorage.getItem("userData"));

        //get _id of to-be-deleted favorite
        let favoriteId;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].name === team) {
                favoriteId = favorites[i]._id;
            };
        };

        //send request to backend to delete favorite from mongo
        try {
            let response = await axios({
                method: "delete",
                url: "/favorites",
                data: { favorite: team, teamId: favoriteId },
                headers: { "Content-type": "application/json", "Authorization": `Bearer ${authCtx.token}`, userId: userData.userId }
            });
            //delete favorite from state
            setFavorites(prevFavorites => prevFavorites.filter(filterTeam => filterTeam.name !== team));
        } catch (err) {
            alert(err.response.data);
        }
    }
    //function to change refresh state and trigger useEffect on Results page
    function handleToggleRefresh() {
        setRefresh(prevRefresh => !prevRefresh);
    };

    //context to be provided to children
    const context = {
        favorites,
        refresh,
        addFavorite: handleAddFavorite,
        deleteFavorite: handleDeleteFavorite,
        fetchFavorites: handleFetchFavorites,
        toggleRefresh: handleToggleRefresh
    };

    return <FavoritesContext.Provider value={context}>{props.children}</FavoritesContext.Provider>
};

export default FavoritesContext;