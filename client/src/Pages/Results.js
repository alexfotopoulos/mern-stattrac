import React, { useEffect, useState, useContext } from "react";
import "./Results.css";
import { useParams } from "react-router-dom";
import { fetchPlayerData } from "../helpers";
import Player from "../components/Player";
import FavoritesContext from "../store/favorites-context";
import AuthContext from "../store/auth-context";

export default function Results() {
    //consume auth context
    const authCtx = useContext(AuthContext);
    //consume favorites context
    const favoritesCtx = useContext(FavoritesContext);
    //create empty array for players
    const [players, setPlayers] = useState([]);
    //useParams to store the selected school
    const params = useParams();
    //state to track whether the current team is favorited
    const [isFavorite, setIsFavorite] = useState(false);


    //call backend API to fetch players from the selected school
    useEffect(() => {
        async function getData() {
            let teamPlayers = await fetchPlayerData(params.collegeTeam);
            setPlayers(teamPlayers);
        };
        getData();
    }, [favoritesCtx.refresh]);
    //determine whether the current team is favorited is user is logged in
    useEffect(() => {
        if (authCtx.token) {
            let favorited = false;
            for (let i = 0; i < favoritesCtx.favorites.length; i++) {
                if (favoritesCtx.favorites[i].name === params.collegeTeam) {
                    favorited = true;
                };
            };
            setIsFavorite(favorited);
        };
    }, [favoritesCtx.favorites, favoritesCtx.refresh]);

    //toggle whether team is favorited
    function toggleFavorite() {
        if (!isFavorite) {
            favoritesCtx.addFavorite(params.collegeTeam);
        } else {
            favoritesCtx.deleteFavorite(params.collegeTeam);
        };
    };


    //map over returned players
    let content;
    if (players.length === 0) {
        content = <h2 className="text-center mt-5">Team Not Found</h2>;
    } else {
        content = (
            <div className="Results">
                <div className="Results-header mb-3">
                    <h2 >{params.collegeTeam.toUpperCase()}</h2>
                    {authCtx.token && <div className="form-check">
                        <input className="form-check-input" onChange={toggleFavorite} type="checkbox" value={isFavorite} id="flexCheckDefault" checked={isFavorite} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {isFavorite ? "Remove from favorites" : "Add to favorites"}
                        </label>
                    </div>}
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th >Name</th>
                            <th >Team</th>
                            <th >Position</th>
                            <th >Experience</th>
                            <th >Status</th>
                            <th >News</th>
                            <th >Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => (
                            <Player key={Math.random()} player={player} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };


    return (
        <div className="row">
            <div className="col">
                {content}
            </div>
        </div>
    );
};
