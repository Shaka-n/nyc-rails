import React from 'react'
import StarRating from './StarRating.js'

const CommentForm = (props)=>{

    const placeholderMsgs = [
    "Tell me how you really feel.", 
    "Go on.", 
    "Someone has to say it.", 
    "You know it's always going to be like this, don't you?",
    "It's ok to be sad sometimes.",
    "I wonder what they're saying about you.",
    "Greatest city in da world babyyyy!!",
    "There is no need to be upset.",
    "You could always ride a bike.",
    "Love the city this time of year.",
    "Calm down. :)",
    "What? You never learned 24-hour time?",
    "Are you afraid of being pushed onto the tracks?",
    "Breathe. It's only going to be like this every day."
]

    const randomPlaceHolder = () =>{
        return placeholderMsgs[Math.floor(Math.random()* Math.floor(placeholderMsgs.length-1))]
    }

    return(
        <div id={'comment-form'}>
            <form onSubmit={e => props.handleFormSubmit(e)}>
                <StarRating 
                    handleRatingChange={e => props.handleRatingChange(e)}
                    />
                <input 
                    type="textarea" 
                    id={"comment-body"}
                    onChange={e => 
                    props.handleFormChange(e)}
                    value={props.commentFormBody}
                    style={{height:"100px", width:"400px"}}
                    placeholder={randomPlaceHolder()}
                />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CommentForm