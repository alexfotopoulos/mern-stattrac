import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import "./App.css";

import Nav from "./components/Nav";
import Homepage from "./Pages/Homepage";
import Results from "./Pages/Results";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import FavoritesContext from "./store/favorites-context";
import ThemeContext from "./store/theme-context";
import AuthContext from "./store/auth-context";

export default function App() {
  //consume auth context
  const authCtx = useContext(AuthContext)
  //consume favorites context
  const favoritesCtx = useContext(FavoritesContext)
  // consume theme context
  const themeCtx = useContext(ThemeContext)

  //check if user should be logged and fetch favorites if so
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"))
    if (storedData && storedData.token) {
      authCtx.token = storedData.token
      authCtx.userId = storedData.userId
      favoritesCtx.fetchFavorites()
      console.log("IN USE EFFECT OF APP")
    }
  }, [authCtx.token])


  return (
    <div className="App" id={themeCtx.theme}>
      <Nav />
      <div className="container-sm">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/teams/:collegeTeam" element={<Results />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}