import React from 'react'

const Comment = (props) =>{
return(
    <div>
        {/* <p>{props.user} said:</p> */}
        <p>{props.commentBody}</p>
        {/* <p>at {props.created_at}</p> */}
    </div>
)
}

export default Comment