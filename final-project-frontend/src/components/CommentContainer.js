import React from 'react'
import CommentForm from './CommentForm'


const CommentContainer= (props)=>{
    
    return(
        <div className={"comment-container"}>
            <CommentForm 
            commentFormBody={props.commentFormBody}
            handleFormChange={props.handleFormChange}
            />
            {/* {props.selectedLineComments.map(comment => <Comment comment={comment}/>)} */}
        </div>
    )
}

export default CommentContainer