import React from 'react'
// import Star from './Star.js'

const StarRating = (props) => {

    return(
        <div class='rating'>
            <input id="demo-1" type="radio" name="demo" value="1" onChange={e => props.handleRatingChange(e)}/> 
            <label for="demo-1">1 star</label>
            <input id="demo-2" type="radio" name="demo" value="2" onChange={e => props.handleRatingChange(e)}/>
            <label for="demo-2">2 stars</label>
            <input id="demo-3" type="radio" name="demo" value="3" onChange={e => props.handleRatingChange(e)}/>
            <label for="demo-3">3 stars</label>
            <input id="demo-4" type="radio" name="demo" value="4" onChange={e => props.handleRatingChange(e)}/>
            <label for="demo-4">4 stars</label>
            <input id="demo-5" type="radio" name="demo" value="5" onChange={e => props.handleRatingChange(e)}/>
            <label for="demo-5">5 stars</label>
            
        <div class="stars">
            <label for="demo-1" aria-label="1 star" title="1 star"></label>
            <label for="demo-2" aria-label="2 stars" title="2 stars"></label>
            <label for="demo-3" aria-label="3 stars" title="3 stars"></label>
            <label for="demo-4" aria-label="4 stars" title="4 stars"></label>
            <label for="demo-5" aria-label="5 stars" title="5 stars"></label>   
        </div>
        </div>
    )
}

export default StarRating