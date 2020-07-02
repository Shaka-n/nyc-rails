import React from 'react'


const LinePicker = (props) =>{
    
const handleChange = (line) =>{
    props.updateSelectedStation(line)
    console.log(line)
}
    return(
        <div>
            {/* {console.log('Initial render')} */}
            {props.stationsLoading && (<p>Loading!</p>)}
            {!props.stationsLoading && (
                <>
                <p>The currently selected line is: {props.selectedStation ? props.selectedStation.toUpperCase() : "None"}</p>
                <select name="line-selection" id="lines" onChange={(e)=> handleChange(e.target.value)}>
                <option>Choose a line</option>
                <option value="l">L</option>
                <option value="ace">A,C,E</option>
                <option value="123456">1,2,3,4,5,6</option>
                <option value="bdfm">B,D,F,M</option>
                <option value="nqrw">N,Q,R,W</option>
                <option value="jz">J,Z</option>
            </select>
                </>
            )}
        </div>
    )
}

export default LinePicker