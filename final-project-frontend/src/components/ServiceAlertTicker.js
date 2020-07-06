import React from 'react'
import './ServiceAlertTicker.css'

const ServiceAlertTicker = (props) =>{
    return(
        <>
        <div className={"ticker"}>
        {/* style={{animation: "ticker 60s infinite linear"}} */}
            <div className={"ticker__list"} >
                {props.serviceAlerts.map(alert =>{
                    switch(props.selectedLine){
                        case'l':
                        if(alert.alert.includes("[L]")){
                            // style={{maxHeight: "20px", width: "500px"}}
                            return <div key={alert.id} className={"ticker__item"}>{alert.alert}</div>
                        }
                        break;
                        case 'ace':
                            if(alert.alert.includes("[A]")|| alert.alert.includes("[C]")|| alert.alert.includes("[E]")){
                                // style={{maxHeight: "20px", width: "500px"}}
                                return <div key={alert.id} className={"ticker__item"}>{alert.alert}</div>
                            }
                        // case '123456':
                        //     if(alert.alert.includes("[1]")|| alert.alert.includes("[2]")|| alert.alert.includes("[3]")){
                        //         // style={{maxHeight: "20px", width: "500px"}}
                        //         return <div key={alert.id} className={"ticker__item"}>{alert.alert}</div>
                        //     }
                        default:
                            return <div key={alert.id} className={"ticker__item"}>{alert.alert}</div>
                    }
                    
                })}
            </div>
        </div>    
        </>
    )
}

export default ServiceAlertTicker