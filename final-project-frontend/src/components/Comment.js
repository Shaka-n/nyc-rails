import React from 'react'

const Comment = (props) =>{
return(
    <div style={{display:"flex"}}>
        {/* <p>{props.user} said:</p> */}
        <p>{props.commentBody}</p>
        <button onClick={() => props.deleteComment(props.commentId)}>X</button>
        {/* <p>at {props.created_at}</p> */}
    </div>
)
}

export default Comment