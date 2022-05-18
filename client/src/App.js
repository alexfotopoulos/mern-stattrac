import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import "./App.css";

import Nav from "./components/Nav";
import Homepage from "./Pages/Homepage";
import Results from "./Pages/Results";
import FavoritesContext from "./store/favorites-context";
import ThemeContext from "./store/theme-context";

export default function App() {
  //consume favorites context
  let favoritesCtx = useContext(FavoritesContext)

  // consume theme context
  let themeCtx = useContext(ThemeContext)

  //fetch favorites
  useEffect(() => {
    favoritesCtx.fetchFavorites()
  }, [])


  return (
    <div className="App" id={themeCtx.theme}>
      <Nav/>
      <div className="container-sm">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:collegeTeam" element={<Results />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}