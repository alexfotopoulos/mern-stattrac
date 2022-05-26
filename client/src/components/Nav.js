import React, { useContext, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./Nav.css"
import FavoritesContext from "../store/favorites-context"
import ThemeContext from "../store/theme-context"
import AuthContext from "../store/auth-context"

export default function Nav() {
    //consume auth context
    const authCtx = useContext(AuthContext)

    //consume favorites context
    const favoritesCtx = useContext(FavoritesContext)

    //consume theme context
    const themeCtx = useContext(ThemeContext)

    //state to determine toggle light or dark
    const [isDarkMode, setIsDarkMode] = useState(null)

    //change refresh in favorite context so Results page will refresh when switching favorites from nav bar
    function handleToggleRefresh() {
        favoritesCtx.toggleRefresh()
    }

    //function to toggle light/dark mode
    function toggleMode() {
        if (themeCtx.theme === "dark") {
            setIsDarkMode(false)

        } else {
            setIsDarkMode(true)
        }
        themeCtx.toggleTheme()
    }

    //function to log user out
    async function logout() {
        authCtx.logout()
    }

    //create Links in dropdown for favorited teams
    let content
    if (!authCtx.token) {
        content = <li>Login to add favorites</li>
    } else {
        if (favoritesCtx.favorites.length === 0) {
            content = <li>You have no favorites</li>
        } else {
            content = favoritesCtx.favorites.map(team => (
                <Link className="dropdownLink" onClick={handleToggleRefresh} key={team._id} to={`/teams/${team.name}`}>{team.name}</Link>
            ))
        }
    }
    return (
        <nav className={`navbar navbar-expand-md navbar-${themeCtx.theme === "light" ? "light" : "dark"} bg-${themeCtx.theme === "light" ? "light" : "dark"} sticky-top mb-4`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Stattrac</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Favorites
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <div className="navbar-favoritesList">
                                    {content}
                                </div>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.pro-football-reference.com/" target="_blank">Pro Football Reference</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.nfl.com/" target="_blank">NFL.com</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav Nav-authButtons">
                        {!authCtx.token && <li className="nav-item">
                            <Link className="nav-link" to="/users/register">Register</Link>
                        </li>}
                        {!authCtx.token && <li className="nav-item">
                            <Link className="nav-link" to="/users/login">Login</Link>
                        </li>}
                        {authCtx.token && <li className="nav-item">
                            <Link onClick={logout} className="nav-link" to="/">Logout</Link>
                        </li>}
                    </ul>
                    <div id="toggleSwitch" onClick={toggleMode} className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isDarkMode} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Dark Mode</label>
                    </div>
                </div>
            </div>
        </nav>
    )
}