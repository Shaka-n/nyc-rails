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
        // console.log(props.station)
        if(props.station.d2){
            return(
                <div>
                    <h3> {props.station.d2.stationName} </h3>
                    <div className={"favorite"} onClick={(e)=>props.favoriteStation(e, props.station)}><span >☆</span></div>
                    <div className={"northbound-station"}>
                        <p>Direction: {determineDirection(props.station.d2.stationId)}</p>
                        <p>Next train: {convertPosixToDate(props.station.d2.nextArrival)} </p>
                    </div>
                    <div className={"southbound-station"}>
                        <p>Direction: {determineDirection(props.station.d1.stationId)} </p>
                        <p>Next train: {convertPosixToDate(props.station.d1.nextArrival)}</p>
                    </div>
                </div>
            )
            
        } else{
            return (
                <div>
                <h3>{props.station.d1.stationName}</h3>
                <div className={"favorite"} onClick={(e)=>props.favoriteStation(e, props.station.d1)}><span >☆</span></div>
                <div className={"northbound-station"}>
                    <p>Direction: {determineDirection(props.station.d1.stationId)}</p>
                    <p>Next train: {convertPosixToDate(props.station.d1.nextArrival)} </p>
                </div>
                </div>
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