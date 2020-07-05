import React from 'react'
import StationSummary from './StationSummary.js'

const LineContainer = (props) =>{


const renderStationSummary = (targetStation) =>{
    console.log("In the Render Station Summary")    

    // Find the paired stops at each station
    let pairedStops
        pairedStops = props.currentSchedules.filter(stop => stop.stationName===targetStation.stationName)

    // Render each stop in a StationSummary component
    console.log("Paired stops", pairedStops)
    return <StationSummary 
            stops={pairedStops}
            // name={targetStation.stationName} 
            // direction={targetStation.stationId.slice(-1)} 
            // nextArrival={targetStation.nextArrival}
            />
        
}

    return(
            <div id={"line-container"} style={{
                display: 'flex', 
                flexFlow: 'row wrap', 
                alignContent: 'space-between',
                backgroundColor: '#282c34', 
                width: '650px',
                height: '400px',
                overflow: 'scroll'
                }}>
                {console.log(props.currentSchedules)}
                {props.currentSchedules.map(station => renderStationSummary(station))}
                
            </div>
        
    )
}

export default LineContainer