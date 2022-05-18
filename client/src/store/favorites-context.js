import { createContext, useState } from "react";
import axios from 'axios'

const FavoritesContext = createContext({
    favorites: [],
    refresh: false,
    addFavorite: (data) => { },
    deleteFavorite: (data) => { },
    fetchFavorites: (data) => { },
    toggleRefresh: (data) => { }
});

export function FavoritesContextProvider(props) {
    //state to store the favorites
    const [favorites, setFavorites] = useState([])
    //refresh state to trigger useEffect of Results page when switching from favorite to favorites
    const [refresh, setRefresh] = useState(false)

    //function to add favorite to firebase and favorites state
    async function handleAddFavorite(team) {
        let response = await axios({
            method: 'post',
            url: 'https://react-stattrac-default-rtdb.firebaseio.com/favorites.json',
            data: { name: team },
            headers: { 'Content-type': 'application/json' }
        });
        //create object to store id from firebase and name of new team
        let newTeam = {
            id: response.data.name,
            name: team
        }
        setFavorites(prevFavorites => [...prevFavorites, newTeam])
    }
    //function to delete favorite to firebase and favorites state
    async function handleDeleteFavorite(team, id) {
        let response = await axios({
            method: 'delete',
            url: `https://react-stattrac-default-rtdb.firebaseio.com/favorites/${id}.json`,
            headers: { 'Content-type': 'application/json' }
        })
        //delete favorite
        setFavorites(prevFavorites => prevFavorites.filter(filterTeam => filterTeam.name !== team))
    }
    //function to fetch favorites from firebase and set favorites state
    async function handleFetchFavorites() {
        let response = await axios({
            method: 'get',
            url: `https://react-stattrac-default-rtdb.firebaseio.com/favorites.json`,
        })
        //create empty array to store team objects consisting of id and name
        let faves = []
        for (let fave in response.data) {
            //create new object consisting of id and name
            let newObject = {
                id: fave,
                name: response.data[fave].name
            }
            //push new object to empty array
            faves.push(newObject)
        }
        //set favorites to be array of team objects
        setFavorites(faves)
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