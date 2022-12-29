# MERN-Stattrac

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Live link

THe deployed demo of Stattrac can be found <a href="https://foto-stattrac.herokuapp.com/" target="_blank" rel="noreferrer">here</a>.

## Description

When I graduated from Florida State University (FSU), I wanted to keep track of FSU's players who were in the NFL, but soon realized there wasn't a good way to do that. I found myself having to memorize certain players and look them up individually (usually through Google). This was tedious and it became a challenge to remember every player a few years after graduating. 

Stattrac is a fullstack MERN web application that allows a user to search for players currently active in the National Football League (NFL) based upon where they went to college. Users can create an account which will allow them to save schools to their favorites and avoid having to repeatedly search for commonly viewed schools. The results page includes the following information: name, NFL team, position, experience, status, stats link, and news link. All information except for the stats and news links are provided from the API. The stats link redirects the user to the player's team page on profootballreference.com where the user can find the player's stats, and the news link redirects the user to Google news with the player already searched.

The app is built using React, React Context for app-wide state management, Mongo Atlas/Mongoose for data storage, Axios for data-fetching, jsonwebtoken for auth, Express for server functionality, and the [SportsData.io](https://sportsdata.io/) API to source the relevant data.

## Technologies used

### Front end
- HTML
- CSS
- Bootstrap
- React
- React Context
- React Router
 
### Back end
- Express
- Bcrypt
- jsonwebtoken
- Mongo/Mongoose