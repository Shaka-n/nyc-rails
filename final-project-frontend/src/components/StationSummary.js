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
        // console.log(props.stops)
        if(props.stops.length === 1){
            return (
                <div>
                <h2>Station: {props.stops[0].stationName} </h2>
                <div className={"northbound-station"}>
                    <h3>Direction: {determineDirection(props.stops[0].stationId)}</h3>
                    <h3>Next train at: {convertPosixToDate(props.stops[0].nextArrival)} </h3>
                </div>
                </div>
                )
        } else if (props.stops.length === 2){
            return(
                <div>
                    <h2>Station:{props.stops[0].stationName} </h2>
                    <div className={"northbound-station"}>
                        <h3>Direction: {determineDirection(props.stops[0].stationName)}</h3>
                        <h3>Next train at: {convertPosixToDate(props.stops[0].nextArrival)} </h3>
                    </div>
                    <div className={"southbound-station"}>
                        <h3>Direction:{determineDirection(props.stops[1].stationName)} </h3>
                        <h3>Next train at:  {convertPosixToDate(props.stops[1].nextArrival)}</h3>
                    </div>
                </div>
            )
        }
    }


    return(

        <div className={"station-summary"}>
            {console.log("This should be a station Summary")}
            {renderSummary()}
        </div>
    )
}

export default StationSummary