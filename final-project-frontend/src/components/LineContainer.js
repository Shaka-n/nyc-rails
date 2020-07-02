import React from 'react'
import StationSummary from './StationSummary.js'

const LineContainer = (props) =>{


const renderStationSummary = (targetStation) =>{
    console.log("In the Render Station Summary")

    // Find the paired stops at each station
    let pairedStops
    // props.currentSchedules.map(station =>{
        pairedStops = props.currentSchedules.filter(stop => stop.stationName===targetStation.stationName)
    // })
    // Render each stop in a StationSummary component
    return <StationSummary 
            stops={pairedStops}
            // name={station.stationName} 
            // direction={station.stationId.slice(-1)} 
            // nextArrival={station.nextArrival}
            />
        
}

    return(
            <div>
                {console.log(props.currentSchedules)}
                {props.currentSchedules.map(station => {return renderStationSummary(station)})}
                
            </div>
        
    )
}

export default LineContainer