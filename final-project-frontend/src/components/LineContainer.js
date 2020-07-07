import React from 'react'
import StationSummary from './StationSummary.js'

const LineContainer = (props) =>{


const renderStationSummary = (pairedStopsSchedule) =>{
    // console.log("In the Render Station Summary")    

    // Find the paired stops at each station
    // let pairedStops
    //     pairedStops = props.currentSchedules.filter(stop => stop.stationName===targetStation.stationName)
    // makeStopPairs(props.currentSchedules)
    // Render each stop in a StationSummary component.
    // XXX
    // THIS IS WHERE THE DOUBLING UP IS HAPPENING. BOTH NORTH AND SOUTHBOUND TRIPS END UP IN PAIRS.
    //  NEED TO MAKE SOME SORT OF REDUCER TO SKIP PAST AN ENTRY IF THERE IS ALREADY A PAIR CONTAINING IT.
    // XXX
    // console.log("Paired stops", pairedStops)
    pairedStopsSchedule.map(station =>{
        return <StationSummary 
        // key={pairedStops}
        // stops={pairedStops}
        station = {station}
        favoriteStation={props.favoriteStation}
        // name={targetStation.stationName} 
        // direction={targetStation.stationId.slice(-1)} 
        // nextArrival={targetStation.nextArrival}
        />
    })
        
}
const renderStationSummaries = (schedule) =>{
    console.log("Original Schedule", schedule)
    let pairedStopsSchedule =[]
    for(let i = 0;i<schedule.length-1;i++){
        let j = i + 1
        console.log("Schedule[i]", schedule[i].stationName)
        console.log("Schedule[j]", schedule[j].stationName)
        if(j===schedule.length){
            pairedStopsSchedule.push({d1:schedule[j]})
            console.log('last')
        }else if(schedule[i].stationName === schedule[j].stationName){
            pairedStopsSchedule.push({d1:schedule[i], d2:schedule[j]})
            i++
            console.log('pair')
        }
        else{
            console.log('single')
            pairedStopsSchedule.push({d1:schedule[i]})
        }

    }
    console.log("Paired Stops Schedule", pairedStopsSchedule)
    return pairedStopsSchedule.map(station =>{
        return <StationSummary 
        // key={pairedStops}
        station = {station}
        favoriteStation={props.favoriteStation}

        />
    })
}

// makeStopPairs(props.currentSchedules)
    return(
            <div id={"line-container"} style={{
                display: 'flex', 
                flexFlow: 'row wrap', 
                alignContent: 'space-between',
                backgroundColor: '#4D5357', 
                width: '650px',
                height: '400px',
                overflow: 'scroll'
                }}>
                {/* {console.log(props.currentSchedules)} */}
                {renderStationSummaries(props.currentSchedules)}
                {/* {props.currentSchedules.map(station => renderStationSummary(station))} */}
                
            </div>
        
    )
}

export default LineContainer