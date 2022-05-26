import { createContext, useState, useContext } from "react";
import AuthContext from "./auth-context";
import axios from "axios"

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
    const authCtx = useContext(AuthContext)
    //state to store the favorites
    const [favorites, setFavorites] = useState([])
    //refresh state to trigger useEffect of Results page when switching from favorite to favorites
    const [refresh, setRefresh] = useState(false)

    //function to fetch favorites from mongoDB and set favorites state
    async function handleFetchFavorites() {
        let response = await axios({
            method: 'get',
            url: `/favorites`,
            headers: { "Authorization": `Bearer ${authCtx.token}` }
        })
        //create empty array to store team objects consisting of id and name
        let faves = []
        for (let fave in response.data) {
            //push new object to empty array
            faves.push(response.data[fave])
        }
        //set favorites to be array of team objects
        setFavorites(faves)
    }
    //function to add favorite to mongoDB and favorites state
    async function handleAddFavorite(team) {
        let response = await axios({
            method: 'post',
            url: '/favorites',
            data: { favorite: team },
            headers: { 'Content-type': 'application/json', "Authorization": `Bearer ${authCtx.token}` }
        });
        //create object to add new team to state
        let newTeam = response.data.favorite
        setFavorites(prevFavorites => [...prevFavorites, newTeam])
    }
    //function to delete favorite from mongoDB and favorites state
    async function handleDeleteFavorite(team) {
        let response = await axios({
            method: 'delete',
            url: '/favorites',
            data: { favorite: team },
            headers: { 'Content-type': 'application/json', "Authorization": `Bearer ${authCtx.token}` }
        });
        //delete favorite from state
        setFavorites(prevFavorites => prevFavorites.filter(filterTeam => filterTeam.name !== team))
    }
    //function to change refresh state and trigger useEffect on Results page
    function handleToggleRefresh() {
        setRefresh(prevRefresh => !prevRefresh)
    }

    //context to be provided to children
    const context = {
        favorites,
        refresh,
        addFavorite: handleAddFavorite,
        deleteFavorite: handleDeleteFavorite,
        fetchFavorites: handleFetchFavorites,
        toggleRefresh: handleToggleRefresh
    }

    return <FavoritesContext.Provider value={context}>{props.children}</FavoritesContext.Provider>
}

export default FavoritesContext