import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Team from "../components/Team";
import { fetchTeamData } from "../helpers";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    //state to hold all applicable teams
    const [allTeams, setAllTeams] = useState([]);
    //state to hold search term entered by user
    const [searchTerm, setSearchTerm] = useState("");

    //useNavigate to redirect to team after submission
    const navigate = useNavigate();

    //useEffect to call backend server and fetch data from API
    useEffect(() => {
        async function getData() {
            let activeTeams = await fetchTeamData();
            setAllTeams(activeTeams);
        };
        getData();
    }, []);

    //use search filter to show teams which match the search term entered by the user
    let showTeams = allTeams.filter(team => {
        if (searchTerm === "") return;
        if (team.toLowerCase().includes(searchTerm.toLowerCase())) {
            return team;
        };
    }).map(team => (
        <Team team={team} key={team} />));

    function search(e) {
        if (e.key === "Enter") {
            if (showTeams.length === 1) {
                navigate(`/teams/${showTeams[0].props.team}`);
            };
        };
    };

    return (
        <div className="row justify-content-center">
            <div className="col">
                <div className="Homepage">
                    <h1>Welcome to Stattrac</h1>
                    <p>Search for a school to view their current NFL players</p>
                    <input className="Homepage-input mb-3" onChange={event => setSearchTerm(event.target.value)} onKeyUp={search} type="text" placeholder="Search college..." />
                    <div className="Homepage-searchResults">
                        {showTeams}
                    </div>
                </div>
            </div>
        </div>
    );
};
