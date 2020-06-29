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
    "Content-Type": "application/x-protobuf",
    "Accept": "application/x-protobuf",
    "x-api-key": API_KEY }
}

function App() {

const [stations, setStations] = useState([])

  useEffect(()=>{
    // request(requestSettings, (error, response, body) => {
    //   if (!error && response.statusCode === 200) {
    //     ProtoBuf.load(['services/config/nyct-subway.proto', 'services/config/gtfs-realtime.proto']).then((root) => {
    //       console.log(root.lookupType('FeedMessage').decode(body))
    //     })
    //   } else {
    //     console.log(`Error: ${error}, Status Code: ${response.statusCode}`)
    //   }
    // })
    fetch("http://localhost:3000/stations")
    .then(response => response.json())
    .then(dbStations => setStations(dbStations))
    .then(r => console.log(stations))

    request(requestSettings, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var feed = gtfsRB.FeedMessage.decode(body)
        feed.entity.forEach(function(entity) {
          console.log(entity)
          // if (entity.trip_update) {
          //   console.log(entity.trip_update);
          // }
        })
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
