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
  // const testId = "L03N"
  const stopId = fullStopId.substring(0, fullStopId.length - 1)
  console.log(stopId)
  const targetStation = stations.find(station => station.gtfsStopId === stopId)
  console.log(targetStation)
}
  

const App = () => {

const [stations, setStations] = useState([])
const [arrivalsForL, setArrivalsForL] = useState([])

// Mounting Effect,
  useEffect(()=>{
// Fetching static station data
    const fetchStationData = async () =>{
      fetch("http://localhost:3000/stations")
        .then(response => response.json())
        .then(dbStations => {setStations(stations => [...stations, dbStations])})
        .then(resp => console.log(stations))
    }
    fetchStationData()

// requesting live feed data
const fetchLiveData = () =>{
  request(requestSettings, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const feed = gtfsRB.FeedMessage.decode(body)
      console.log(stations)
      feed.entity.forEach((entity) => {
        // console.log(entity)
        if (entity.tripUpdate) {
          // console.log(entity.tripUpdate)
          entity.tripUpdate.stopTimeUpdate.map( stopTU =>{
            console.log(stopTU.stopId)
            translateStationId(stations, stopTU.stopId)
            if(stopTU.arrival){
              console.log('Estimated Arrival Time:', convertPosixToDate(stopTU.arrival.time))
              // if(!arrivalsForL.find(arrival => arrival.stationID ===stopTU.stopId)){
              //   setArrivalsForL(arrivalsForL.push(
              //     {stationId: stopTU.stopId, 
              //       nextArrival:stopTU.arrival.time
              //     })
              //     )
              // }
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
        <p>
          There are {stations.length} stations in the database.
          There are {arrivalsForL.count} stations with arrival times.
        </p>
      </header>
    </div>
  );
}

export default App;
