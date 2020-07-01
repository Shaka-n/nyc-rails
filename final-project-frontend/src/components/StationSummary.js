import React from 'react'

const StationSummary = (props) =>{


    const convertPosixToDate = (unix_timestamp)=>{
        const date = new Date(unix_timestamp * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
      }

    const direction = "North"

    if (props.direction === "N"){
        direction = "North"
    }else if(props.direction==="S"){
        direction ="South"
    }


    return(

        <div className={"station-summary"}>
            {console.log("This should be a station Summary")}
            <h3>Name: {props.name}</h3>
            <h3>Direction:{direction}</h3>
            <h3>Next train at: {convertPosixToDate(props.nextArrival)}</h3>
        </div>
    )
}

export default StationSummary