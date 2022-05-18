import React from "react"
import { Link } from "react-router-dom"
import "./Team.css"

export default function Team(props) {
  return (
    <p><Link className="Team" to={`/${props.team}`}>{props.team}</Link></p>
  )
}
