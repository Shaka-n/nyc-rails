import React from 'react'
import './ServiceAlertTicker.css'

const ServiceAlertTicker = (props) =>{
    return(
        <>
        <div className={"ticker"}>
            <div className={"ticker__list"} style={{animation: "ticker 60s infinite linear"}}>
                {props.serviceAlerts.map(alert =>{
                    if(alert.alert.includes("[L]")){
                        return <div key={alert.id} className={"ticker__item"} style={{maxHeight: "20px", width: "300px"}}>{alert.alert}</div>
                    }
                })}
            </div>
        </div>    
        </>
    )
}

export default ServiceAlertTicker