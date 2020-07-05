import React from 'react'
import StationSummary from './StationSummary.js'

const LineContainer = (props) =>{


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
            // name={targetStation.stationName} 
            // direction={targetStation.stationId.slice(-1)} 
            // nextArrival={targetStation.nextArrival}
            />
        
}
const makeStopPairs = (schedule) =>{
    // METHOD 1
    let pairedStopsSchedule =[]
    
    for(let i = 0;i>schedule.length;i++){
        let j = i + 1
        if(schedule[i].stationName == schedule[j].stationName){
            pairedStopsSchedule.push({d1:schedule[i], d2:schedule[j]})
            i++
        }
    }
    console.log(pairedStopsSchedule)
    // METHOD 2
    const reducer = (pairedSchedule, stop) =>{
        if(pairedSchedule.last.d1.stationName === stop.stationName){
            return pairedSchedule.last.d2 = stop
        }else{
            return pairedSchedule.push({d1:stop})
        }
    }

    const pairedSchedule = schedule.reduce(stop =>{
        reducer(stop)
    })
    console.log(pairedSchedule)
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
                {/* {console.log(props.currentSchedules)} */}
                {props.currentSchedules.map(station => renderStationSummary(station))}
                
            </div>
        
    )
}

export default LineContainer