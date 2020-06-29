import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
const ProtoBuf = require('protobufjs')
const request = require('request')
const gtfsRB = require('gtfs-rb').transit_realtime

const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.REACT_APP_API_KEY

const requestSettings = {
  method: 'GET',
  url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l',
  encoding: null,
  headers: { 
    "Content-Type": "application/x-proto",
    "Accept": "application/x-proto",
    "x-api-key": API_KEY }
}

const posixToStandardTime = (posix) =>{
  let unix_timestamp = posix
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  
  console.log(formattedTime);
}

function App() {

const [stops, setStops] = useState([])

  useEffect(()=>{
    // Alternative request, without Google default bindings
  
    // request(requestSettings, (error, response, body) => {
    //   if (!error && response.statusCode === 200) {
    //     ProtoBuf.load(['services/config/nyct-subway.proto', 'services/config/gtfs-realtime.proto']).then((root) => {
    //       console.log(root.lookupType('FeedMessage').decode(body))
    //     })
    //   } else {
    //     console.log(`Error: ${error}, Status Code: ${response.statusCode}`)
    //   }
    // })

    request(requestSettings, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const feed = gtfsRB.FeedMessage.decode(body)
        feed.entity.forEach((entity) =>{
          if (entity.tripUpdate) {
            entity.tripUpdate.stopTimeUpdate.forEach(stop =>{
              // console.log(stop)
              // if (stop.arrival.time){
              //   console.log(stop.arrival.time)
              // } else{
              //   console.log('no arrival time provided')
              // }
            // })
            console.log(stop.stopId)
            entity.tripUpdate.stopTimeUpdate.forEach(stopEvent =>{
              // console.log(stopEvent.arrival)
              if (stopEvent.arrival){
              console.log('Arrival')
              posixToStandardTime(stopEvent.arrival.time)
              }
              // if (stopEvent.departure){
              //   console.log("Departure")
              //   posixToStandardTime(stopEvent.departure.time)
              // }
            })
          })
        }}
        )
      }
    })

})

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
