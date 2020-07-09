import React from 'react'


const LinePicker = (props) =>{
    
const handleChange = (line) =>{
    props.updateSelectedStation(line)
    // console.log(line)
}
    return(
        <div id={"line-picker"}>
            {/* {console.log('Initial render')} */}
            {props.stationsLoading && (<div className="lds-dual-ring"></div>)}
            {!props.stationsLoading && (
                <>
                <p>Now viewing arrival times for the following routes: {props.selectedLine ? props.selectedLine.substr(0).toUpperCase() : "None"}</p>
                <select name="line-selection" id="line-selector" onChange={(e)=> handleChange(e.target.value)}>
                <option>Choose a line</option>
                <option value="-l">L</option>
                <option value="-ace">A,C,E</option>
                <option value="-123456">1,2,3,4,5,6</option>
                <option value="-bdfm">B,D,F,M</option>
                <option value="-nqrw">N,Q,R,W</option>
                <option value="-jz">J,Z</option>
            </select>
                </>
            )}
        </div>
    )
}

export default LinePicker