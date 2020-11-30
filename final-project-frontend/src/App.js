import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LineContainer from './components/LineContainer.js'
import LinePicker from './components/LinePicker.js'
import CommentContainer from './components/CommentContainer.js'
import ServiceAlertTicker from './components/ServiceAlertTicker.js'
import FavoriteContainer from './components/FavoriteContainer';
// import proto from './src/services/config/nyct-subway.proto'
// import proto from './src/services/config/gtfs-realtime'

const ProtoBuf = require('protobufjs')
const request = require('request')
const gtfsRB = require('gtfs-rb').transit_realtime
const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.REACT_APP_API_KEY
const BACKEND = "http://localhost:3000"


const translateStationId = (stations, fullStopId) =>{
  // const testId = "L03N"
  // console.log("fullStopId", fullStopId)
  const stopId = fullStopId.substring(0, fullStopId.length - 1)
  // console.log("StopId:", stopId)
  const targetStation = stations.find(station => station.gtfs_stop_id === stopId)
  // console.log(targetStation)
  if(targetStation){
    return targetStation.stop_name
  }else{
    return "Special Service"
  }
  
}
  
const convertPosixToDate = (unix_timestamp)=>{
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime
}

class App extends React.Component{

state ={
  stations: [],
  currentSchedule:[],
  stationsLoading: false,
  selectedLine: null,
  selectedLineComments: [],
  commentFormBody: '',
  commentFormStarRating: null,
  currentUser: 'Garen',
  currentUserId: 1,
  currentUserFavorites: [],
  serviceAlerts: [],
  favoriteStations: []
}

componentDidMount(){  
// Fetching static station data
    const fetchStationData = () => {
      fetch("http://localhost:3000/stations")
        .then(response => response.json())
        .then(dbStations => this.setState({stations:dbStations}))
        .then(resp => console.log(this.state.stations))
    }
    fetchStationData()
    this.getUserFavorites(this.state.currentUserId)
// requesting live feed data
// this.fetchLiveData()
}

fetchLiveData = (line) =>{
  let targetLine = line
  if(line === "-123456"){
    targetLine = ""
  }
  const requestSettings = {
    method: 'GET',
    url: `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs${targetLine}`,
    encoding: null,
    headers: { 
      "Content-Type": "application/x-protobuf",
      "Accept": "application/x-protobuf",
      "x-api-key": API_KEY }
  }
  // alternate
  // request(requestSettings, (error, response, body) => {
  //   if (!error && response.statusCode === 200) {
  //     ProtoBuf.load(['src/services/config/gtfs-realtime.proto', 'src/services/config/nyct-subway.proto']).then((root) => {
  //       console.log(root.lookupType('FeedMessage').decode(body))
  //     })
  //   } else {
  //     console.log(`Error: ${error}, Status Code: ${response.statusCode}`)
  //   }
  // })
  // request to API
  request(requestSettings, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const feed = gtfsRB.FeedMessage.decode(body)
      // console.log(this.state.stations)
      // let stationSummInfo
      let newSchedule = []
      let newFavorites = []
    feed.entity.forEach((entity) => {
            // console.log(entity)
            // if(entity.vehicle){
            //   console.log(entity.vehicle)
            // }
            if (entity.tripUpdate) {
              entity.tripUpdate.stopTimeUpdate.map( stopTU =>{
                // translateStationId(this.state.stations, stopTU.stopId)
                if(stopTU.arrival){
                  // CHECKING FOR DUPLICATES
                  if(newSchedule.find(station => station.stationId === stopTU.stopId)){
                    // console.log("Existing Station!")
                    // console.log('unique')
                    // console.log("duplicate")
                    
                  }else{
                    // console.log("stop Id", stopTU.stopId)
                    const friendlyName = translateStationId(this.state.stations, stopTU.stopId)
                    const stationSummInfo = {
                      // dbId: dbId,
                      stationName: friendlyName,
                      stationId: stopTU.stopId,
                      nextArrival: stopTU.arrival.time
                    }
                    newSchedule.push(stationSummInfo)
                    if(this.state.currentUserFavorites.find(stationId => stationId === stopTU.stopId.slice(0, -1))){
                      newFavorites.push(stationSummInfo)
                    }
                  }
                }
              })
            }
          })
    newSchedule.sort((a, b) => (a.stationId > b.stationId) ? -1 : 1)
    this.setState({
      stationsLoading: false,
      currentSchedule: newSchedule,
      favoriteStations: newFavorites
    })
      // This is where you should update state
      // this.setState(prevState =>({
      //   ...prevState,
      //   stationsLoading: false,
      //   currentSchedule: newSchedule
      // }))
    }
  })
  
  }

updateSelectedStation = (line) =>{
  const parsedLineValue = line.substr(1)

  this.setState(prevState => ({...prevState, currentSchedule:[], stationsLoading: true, selectedLine: parsedLineValue}))
  this.fetchLiveData(line)
  this.fetchComments(line)
  this.fetchServiceAlerts()
  this.getUserFavorites(this.state.currentUserId)
  }

fetchServiceAlerts = () =>{
  const requestSettings = {
    method: 'GET',
    url: `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts`,
    encoding: null,
    headers: { 
      "Content-Type": "application/x-protobuf",
      "Accept": "application/x-protobuf",
      "x-api-key": API_KEY }
    }

  request(requestSettings, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const feed = gtfsRB.FeedMessage.decode(body)
      const newServiceAlerts = []
      feed.entity.map(entity =>{
        if(entity.alert.descriptionText.translation[0].text[0] !== '<'){
          return newServiceAlerts.push({alert : entity.alert.descriptionText.translation[0].text})
        }
      })
      console.log(newServiceAlerts)
      this.setState({ serviceAlerts : newServiceAlerts})
      }
  })
  }

fetchComments = (line) =>{
  // const targetLine = line.toUpperCase()
// This right here is credibly stupid. 
// I can almost forgive myself since the line id for each line would not change in production... 
// but this is still gross...
  let line_id = 0
  switch(line){
    case '-l': 
      line_id = 19
      break
    case '-ace':
      line_id = 20
      break
    case '-123456':
      line_id = 21
      break
    case '-bdfm':
      line_id = 22
      break
    case "-nqrw":
      line_id = 23
      break
    case '-jz':
      line_id = 24
      break
  }
  // console.log(line_id)
  fetch(`${BACKEND}/lines/${line_id}`)
  .then(response => response.json())
  .then(line => this.setState({selectedLineComments: line.comments}))
}

handleFormChange = (e)=>{
  this.setState({
    commentFormBody: e.target.value,
    // commentFormStarRating: e.target
  })
}
handleRatingChange = (e) =>{
  console.log(this.state.commentFormStarRating)
  this.setState({
    commentFormStarRating: e.target.value
  })
}
handleFormSubmit = (e) =>{
  // TODO: Need to add the comment to the DOM when the button is pressed.
  e.preventDefault() 
  console.log("Comment:", this.state.commentFormBody)
  console.log("Star Rating:", this.state.commentFormStarRating)
  console.log("Line:", this.state.selectedLine)
  console.log("Current User:", this.state.currentUser)
  // This is where the fetch POST to the backend needs to happen.
  const targetLine= this.state.selectedLine.toUpperCase()
  fetch(`${BACKEND}/comments`,{
    method: "POST",
    headers:{ 
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify({
      body: this.state.commentFormBody,
      user_id: this.state.currentUserId,
      name: targetLine,
      rating: this.state.commentFormStarRating
    })
  })
  .then(response => response.json())
  .then(comment =>{
    console.log(comment)
    this.setState(prevState=>({
      selectedLineComments:[...prevState.selectedLineComments, comment],
      commentFormBody: ''
    })) 
  })
}

deleteComment = (id) =>{
  // TODO: Need to remove comment from the DOM when the button is pressed.
  console.log(id)
  fetch(`${BACKEND}/comments/${id}`,{
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
  })
  .then(response => response.json())
  .then(newComment =>{
    const remainingComments = this.state.selectedLineComments.filter(comment => comment.id !== newComment.id)
    this.setState({selectedLineComments: remainingComments})
  })
}

getUserFavorites = (userId) =>{

  fetch(`${BACKEND}/users/${userId}`)
  .then(response => response.json())
  .then(user =>{
    this.setState({currentUserFavorites: user.favorites})
  })
}

favoriteStation = (e, stops) =>{
  console.log(stops)
  let gtfsStopId = stops.d1.stationId.slice(0, -1)
  console.log(gtfsStopId)
  if(stops.d1){
    gtfsStopId = stops.d1.stationId.slice(0, -1)
    console.log(gtfsStopId)
  }

  if(e.target.textContent === "★"||this.state.currentUserFavorites.find(favorite => favorite === gtfsStopId)){
    e.target.textContent = "☆"
    const newFavorites = this.state.currentUserFavorites.filter(favorite => favorite !== stops.d1.stationId)
    this.setState(prevState=>({
      ...prevState,
      currentUserFavorites: newFavorites
    }))

    fetch(`${BACKEND}/favorites/1`,{
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        Accept : "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.currentUserId,
        gtfs_stop_id: gtfsStopId
      })
    })
    .then(response => response.json())
    .then(console.log)

  }else{
    e.target.textContent = "★"
    console.log(stops)
    this.setState( prevState =>({
      ...prevState,
      currentUserFavorites: [
        ...prevState.currentUserFavorites,
        gtfsStopId
      ]}))

  fetch(`${BACKEND}/favorites`,{
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      user_id: this.state.currentUserId,
      gtfs_stop_id: gtfsStopId  
    })
  })
  .then(response => response.json())
  .then(console.log)
  
  }
  
}

render(){
  // console.log(this.state)
  // this.state.stations.forEach(station => console.log(station.gtfs_stop_id))
  // console.log(this.state.stations)
  // console.log(this.state.currentSchedule)
  // console.log(this.state.selectedLineComments)
  console.log(this.state.currentUserFavorites)
  // console.log(this.state.selectedLine)
  // console.log(this.state.serviceAlerts)
  // console.log(this.state.favoriteStations)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          NYCRails: Get Mad at the MTA
          {/* There are {this.state.stations.length} stations in the database.
          There are {this.state.currentSchedule.length} scheduled arrivals.
          There are {this.state.serviceAlerts.length} active service alerts. */}
        </p>
      </header>
      <main>
        <div>
          <ServiceAlertTicker 
          serviceAlerts={this.state.serviceAlerts}
          selectedLine={this.state.selectedLine}
          />
          </div>
          <LinePicker 
          stationsLoading={this.state.stationsLoading}
          selectedLine={this.state.selectedLine}
          updateSelectedStation={this.updateSelectedStation}
          />
          <div id={"content"}>
          <LineContainer 
          currentSchedules = {this.state.currentSchedule} 
          favoriteStation={this.favoriteStation}
          // fetchLiveData={this.fetchLiveData}
          />
          <CommentContainer 
          selectedLineComments={this.state.selectedLineComments}
          commentFormBody={this.state.commentFormBody} 
          commentFormStarRating={this.state.commentFormStarRating}
          handleFormChange={this.handleFormChange}
          handleRatingChange = {this.handleRatingChange}
          handleFormSubmit={this.handleFormSubmit}
          deleteComment={this.deleteComment}
          />
          <FavoriteContainer
          favorites={this.state.favoriteStations}
          currentSchedule={this.state.currentSchedule}
          favoriteStation={this.favoriteStation}

          />
          </div>
      </main>
    </div>
  );
}
}
  

export default App;
