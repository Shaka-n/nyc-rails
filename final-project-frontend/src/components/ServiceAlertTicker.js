import React from 'react'
import './ServiceAlertTicker.css'

const ServiceAlertTicker = (props) =>{
    return(
        <>
        <div className={"ticker"}>
        {/* style={{animation: "ticker 60s infinite linear"}} */}
            <div className={"ticker__list"} >
                {props.serviceAlerts.map(alert =>{
                    if(alert.alert.includes("[L]")){
                        // style={{maxHeight: "20px", width: "500px"}}
                        return <div key={alert.id} className={"ticker__item"}>{alert.alert}</div>
                    }
                })}
            </div>
        </div>    
        </>
    )
}

export default ServiceAlertTicker