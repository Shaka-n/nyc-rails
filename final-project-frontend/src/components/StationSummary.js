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

    const determineDirection = (stationId) =>{
        let direction = stationId.slice(-1)

        if(direction === "N"){
            direction = "North"
        }else if(direction==="S"){
            direction ="South"
        }
        return direction
    }

    const renderSummary = () =>{
        console.log(props.stops)
        if(props.stops.length === 1){
            return (
                <>
                <h3>Station: {props.stops[0].stationName} </h3>
                <div className={"northbound-station"}>
                    <p>Direction: {determineDirection(props.stops[0].stationId)}</p>
                    <p>Next train: {convertPosixToDate(props.stops[0].nextArrival)} </p>
                </div>
                </>
                )
        } else{
            return(
                <>
                    <h3> {props.stops[0].stationName} </h3>
                    <div className={"northbound-station"}>
                        <p>Direction: {determineDirection(props.stops[1].stationId)}</p>
                        <p>Next train: {convertPosixToDate(props.stops[1].nextArrival)} </p>
                    </div>
                    <div className={"southbound-station"}>
                        <p>Direction: {determineDirection(props.stops[0].stationId)} </p>
                        <p>Next train: {convertPosixToDate(props.stops[0].nextArrival)}</p>
                    </div>
                </>
            )
        }
    }


    return(

        <div className={"station-summary"}>
            {renderSummary()}
        </div>
    )
}

export default StationSummary