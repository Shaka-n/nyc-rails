import React from 'react'
import StationSummary from './StationSummary.js'

const LineContainer = (props) =>{

const handleChange = () =>{
    props.fetchLineSchedule()
}
    return(
        <div>
            {/* Need dropdown menu here for line selection */}
            <select name="line-selection" id="lines" onChange={()=> handleChange()}>
                <option value="L">L</option>
                <option value="ACE">A,C,E</option>
                <option value="123456">1,2,3,4,5,6</option>
                <option value="BDFM">B,D,F,M</option>
                <option value="NQRW">N,Q,R,W</option>
                <option value="JZ">J,Z</option>
            </select>
            <div>
            {/* {props.scheduleForL.forEach(station =>(
                <StationSummary name={station.stationName} nextArrival={station.nextArrival}/>
            ))} */}
            </div>
        </div>
    )
}

export default LineContainer