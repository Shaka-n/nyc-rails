import React from 'react'
import StationSummary from './StationSummary.js'

const LineContainer = (props) =>{

const handleChange = () =>{
    props.fetchLiveData()
}

const renderStationSummary = (station) =>{
    console.log("In the Render Station Summary")
    return <StationSummary 
            name={station.stationName} 
            direction={station.stationName.slice(-1)} 
            nextArrival={station.nextArrival}/>
        
}

    return(
        <div>
            {console.log('Initial render')}
            <select name="line-selection" id="lines" onChange={()=> handleChange()}>
                <option>Choose a line</option>
                <option value="L">L</option>
                <option value="ACE">A,C,E</option>
                <option value="123456">1,2,3,4,5,6</option>
                <option value="BDFM">B,D,F,M</option>
                <option value="NQRW">N,Q,R,W</option>
                <option value="JZ">J,Z</option>
            </select>
            <div>
                {props.currentSchedules.map(station => {
                    // console.log(station)
                    return renderStationSummary(station)
                    }
                )}
            </div>
        </div>
    )
}

export default LineContainer