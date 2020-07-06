import React from 'react'
import StationSummary from './StationSummary.js'


const FavoriteContainer = (props) =>{

    const renderStationSummary = (targetStation) =>{
        // console.log("In the Render Station Summary")    
    
        // Find the paired stops at each station
        let pairedStops
            pairedStops = props.currentSchedules.filter(stop => stop.stationName===targetStation.stationName)
        // makeStopPairs(props.currentSchedules)
        // Render each stop in a StationSummary component.
        // XXX
        // THIS IS WHERE THE DOUBLING UP IS HAPPENING. BOTH NORTH AND SOUTHBOUND TRIPS END UP IN PAIRS.
        //  NEED TO MAKE SOME SORT OF REDUCER TO SKIP PAST AN ENTRY IF THERE IS ALREADY A PAIR CONTAINING IT.
        // XXX
        // console.log("Paired stops", pairedStops)
        return <StationSummary 
                key={targetStation.stationId}
                stops={pairedStops}
                favoriteStation={props.favoriteStation}
                // name={targetStation.stationName} 
                // direction={targetStation.stationId.slice(-1)} 
                // nextArrival={targetStation.nextArrival}
                />
            
    }

    return(
        <div id={"favorite-container"}>
            <h4>My Favorites</h4>
            {props.favorites.map(favorite=>{
                props.currentSchedule.map(stop =>{
                    if(stop.stationId.includes(favorite)){
                        return renderStationSummary(stop)
                    }
                })
            })}
        </div>
    )
}


export default FavoriteContainer