import React from 'react'
import StationSummary from './StationSummary.js'


const FavoriteContainer = (props) =>{

    const findFavorites = () =>{
        props.favorites.map(favorite =>{

        })
    }

    const renderFavoriteSummaries = (schedule) =>{
        console.log("Original Schedule", schedule)
        let pairedStopsSchedule =[]
        for(let i = 0;i<schedule.length-1;i++){
            let j = i + 1
            console.log("Schedule[i]", schedule[i].stationName)
            console.log("Schedule[j]", schedule[j].stationName)
            if(j===schedule.length){
                pairedStopsSchedule.push({d1:schedule[j]})
                console.log('last')
            }else if(schedule[i].stationName === schedule[j].stationName){
                pairedStopsSchedule.push({d1:schedule[i], d2:schedule[j]})
                i++
                console.log('pair')
            }
            else{
                console.log('single')
                pairedStopsSchedule.push({d1:schedule[i]})
            }
    
        }
        console.log("Paired Stops Schedule", pairedStopsSchedule)
        return pairedStopsSchedule.map(station =>{
            return <StationSummary 
            // key={pairedStops}
            station = {station}
            favoriteStation={props.favoriteStation}
    
            />
        })
    }

    return(
        <div id={"favorite-container"}>
            <h4>My Favorites</h4>
            {/* {renderFavoriteSummaries(props.currentUserFavorites)} */}
        </div>
    )
}



export default FavoriteContainer