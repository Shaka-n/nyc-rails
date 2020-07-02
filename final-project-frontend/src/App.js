import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LineContainer from './components/LineContainer.js'
import LinePicker from './components/LinePicker.js'

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

const translateStationId = (stations, fullStopId) =>{
  // const testId = "L03N"
  const stopId = fullStopId.substring(0, fullStopId.length - 1)
  // console.log(stopId)
  const targetStation = stations.find(station => station.gtfs_stop_id === stopId)
  // console.log(targetStation.stop_name)
  return targetStation.stop_name
}
  

class App extends React.Component{

state ={
  stations: [],
  scheduleForL:[],
  stationsLoading: false,
  selectedLine: 'l'
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
    
// requesting live feed data
// this.fetchLiveData()
}

fetchLiveData = () =>{
  request(requestSettings, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const feed = gtfsRB.FeedMessage.decode(body)
      console.log(this.state.stations)
      feed.entity.forEach((entity) => {
        if (entity.tripUpdate) {
          entity.tripUpdate.stopTimeUpdate.map( stopTU =>{
            // translateStationId(this.state.stations, stopTU.stopId)
            if(stopTU.arrival){
              // console.log('Estimated Arrival Time:', convertPosixToDate(stopTU.arrival.time))
              if(this.state.scheduleForL.find(station => station.stationId === stopTU.stopId)){
                const stationIndex = this.state.scheduleForL.findIndex(station => station.stationId === stopTU.stopId)
                console.log("Existing Station!")
                if(this.state.scheduleForL[stationIndex].nextArrival != stopTU.arrival.time){
                  console.log("Time Difference!")
                  let newSchedule = [...this.state.scheduleForL]
                  newSchedule[stationIndex] = {...newSchedule[stationIndex], nextArrival: stopTU.arrival.time}
                  newSchedule.sort((a, b) => (a.stationId > b.stationId) ? -1 : 1)
                  this.setState(prevState=>({
                    ...prevState,
                    stationsLoading: false,
                    scheduleForL: newSchedule
                  }))
                }
              }else{
                console.log('unique')
                const stationSummInfo = {
                  stationName: translateStationId(this.state.stations, stopTU.stopId),
                  stationId: stopTU.stopId,
                  nextArrival: stopTU.arrival.time}

                this.setState({
                  stationsLoading: false,
                  scheduleForL: [...this.state.scheduleForL, stationSummInfo ]
                })
              }
            }
          })
        }
      })
    }
  })
  
  }

updateSelectedStation = (s) =>{
  this.setState(prev => ({...prev, stationsLoading: true, selectedStation: s}))
  this.fetchLiveData()
  }

render(){
  console.log(this.state.scheduleForL)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          There are {this.state.stations.length} stations in the database.
          There are {this.state.scheduleForL.length} scheduled arrivals.
        </p>
      </header>
      <main>
        <div id="line-box">
          <LinePicker 
          stationsLoading={this.state.stationsLoading}
          selectedStation={this.state.selectedStation}
          updateSelectedStation={this.updateSelectedStation}
          />
          <LineContainer 
          currentSchedules = {this.state.scheduleForL} 
          // fetchLiveData={this.fetchLiveData}
          />
        </div>
      </main>
    </div>
  );
}
}
  

export default App;
