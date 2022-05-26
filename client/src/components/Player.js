import React from "react"
import "./Player.css"
import { teamPairs } from "../helpers"

export default function Player({ player }) {
  return (
    <tr className="Player">
      <td>{player.firstName + " " + player.lastName}</td>
      <td>{player.team}</td>
      <td>{player.position}</td>
      <td>{player.experience}</td>
      <td>{player.status}</td>
      <td><a href={`https://www.google.com/search?q=${player.firstName}+${player.lastName}&tbm=nws`} target="_blank">News</a></td>
      <td><a href={`https://www.pro-football-reference.com/teams/${teamPairs[player.team]}/2021.htm`} target="_blank">Stats</a></td>
    </tr >
  )
}
