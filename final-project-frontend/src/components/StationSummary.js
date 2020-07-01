import React from 'react'

const StationSummary = (props) =>{

    return(
        <div>
            <h3>Name: {props.name}</h3>
            <h3>Next train at: {props.nextArrival}</h3>

        </div>
    )
}

export default StationSummary