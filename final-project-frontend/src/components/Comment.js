import React from 'react'

const Comment = (props) =>{

    let rating = props.rating
    let stars = []
    if(rating){
        for(let i = 0; i<rating ; i++){
            stars.push("★")
        }
    }
return(
    <div className={'comment'}>
        <p>Rating: </p><span className={"comment-rating"}>{stars.map(star=> star)}</span><br></br>
        {/* <p>{props.user} said:</p> */}
        <p>{props.commentBody}</p>
        <button 
        onClick={() => props.deleteComment(props.commentId)}
        >X</button>
        {/* <p>at {props.created_at}</p> */}
    </div>
)
}

export default Comment