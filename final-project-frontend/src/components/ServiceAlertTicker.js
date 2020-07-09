import React from 'react'
import './ServiceAlertTicker.css'

const ServiceAlertTicker = (props) =>{
    // console.log(props.serviceAlerts)
    // console.log(props.selectedLine)

    const tickerItemStyle = () =>{
        return(
            {
                animation: `ticker ${props.serviceAlerts.length * 2} infinite linear`
            }
        )   
    }
    return(
        <>
    
        <div className={"ticker"}>
        {/* style={{animation: "ticker 60s infinite linear"}} */}
            <div className={"ticker__list"} >
            <div key={alert.id} className={"ticker__item"} style={{width: '600px'}}> </div>
                {props.serviceAlerts.map(alert =>{
                //    return  <div key={alert.id} className={"ticker__item"}>{alert.alert}</div>
                    switch(props.selectedLine){
                        case'l':
                        if(alert.alert.includes("[L]")){
                            // style={{maxHeight: "20px", width: "500px"}}
                            return <div 
                            key={alert.id} 
                            className={"ticker__item"}
                            style={tickerItemStyle()}
                            >{alert.alert}</div>
                        }
                        break;
                        case 'ace':
                            if(alert.alert.includes("[A]")|| alert.alert.includes("[C]")|| alert.alert.includes("[E]")){
                                // style={{maxHeight: "20px", width: "500px"}}
                                return <div 
                                key={alert.id} 
                                className={"ticker__item"}
                                style={tickerItemStyle()}
                                >{alert.alert}</div>
                            }
                            break;
                        case 'jz':
                            if(alert.alert.includes("[J]")|| alert.alert.includes("[Z]")){
                                // style={{maxHeight: "20px", width: "500px"}}
                                return <div 
                                key={alert.id} 
                                className={"ticker__item"}
                                style={tickerItemStyle()}
                                >{alert.alert}</div>
                            }
                            break;
                        case 'bdfm':
                            if(alert.alert.includes("[B]")|| 
                            alert.alert.includes("[D]")|| 
                            alert.alert.includes("[F]") || 
                            alert.alert.includes("[M]")){
                                return <div 
                                key={alert.id} 
                                className={"ticker__item"}
                                style={tickerItemStyle()}
                                >{alert.alert}</div>
                            }
                            break;
                        case '123456':
                            if(alert.alert.includes("[1]")|| 
                            alert.alert.includes("[2]")|| 
                            alert.alert.includes("[3]") || 
                            alert.alert.includes("[4]") ||
                            alert.alert.includes("[5]") ||
                            alert.alert.includes("[6]")){
                                return <div 
                                key={alert.id} 
                                className={"ticker__item"}
                                style={tickerItemStyle()}
                                >{alert.alert}</div>
                            }
                            break;
                        case 'nqrw':
                            if(alert.alert.includes("[N]")|| 
                            alert.alert.includes("[Q]")|| 
                            alert.alert.includes("[R]") || 
                            alert.alert.includes("[W]")){
                                return <div 
                                key={alert.id} 
                                className={"ticker__item"}
                                style={tickerItemStyle()}
                                >{alert.alert}</div>
                            }
                        default:
                            if(alert.alert.includes('[ELEVATOR]')){
                                return <div key={alert.id} className={"ticker__item"}>{alert.alert}</div>
                            }
                            
                    }
                    
                })}
            </div>
        </div>    
        </>
    )
}

export default ServiceAlertTicker