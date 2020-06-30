import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// const ProtoBuf = require('protobufjs')
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

const convertPosixToDate = (unix_timestamp)=>{
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime
}

const translateStationId = (stations, fullStopId) =>{
  const testId = "L03N"
  const stopId = fullStopId.substring(0, fullStopId.length - 1)
  console.log(stopId)
  const targetStation = stations.find(station => station.gtfsStopId === stopId)
  console.log(targetStation)
}

const App = () =>{

const [stations, setStations] = useState([])

// Mounting Effect
  useEffect(()=>{
// Fetching static station data
    const fetchStationData = async () =>{
      await fetch("http://localhost:3000/stations")
        .then(response => response.json())
        .then(dbStations => setStations(stations.push(dbStations)))
        .then(resp => console.log(stations))
    }
    fetchStationData()

// requesting live feed data
const fetchLiveData = async () =>{
  await request(requestSettings, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const feed = gtfsRB.FeedMessage.decode(body)
      feed.entity.forEach(function(entity) {
        // console.log(entity)
        if (entity.tripUpdate) {
          // console.log(entity.tripUpdate)
          entity.tripUpdate.stopTimeUpdate.map( stopTU =>{
            console.log(stopTU.stopId)
            translateStationId(stations, stopTU.stopId)
            if(stopTU.arrival){
              console.log('Estimated Arrival Time:', convertPosixToDate(stopTU.arrival.time))
              
            }
          })
        }
      })
    }
  })
  }
fetchLiveData() 
    
    console.log(stations)
},[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          There are {stations.count} in the database.
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
