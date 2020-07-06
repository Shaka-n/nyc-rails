import React from 'react'
import Comment from './Comment.js'
import CommentForm from './CommentForm.js'


const CommentContainer= (props)=>{
    
    return(

        <div className={"comment-container"}>
            {/* {console.log(props.selectedLineComments)} */}
            <CommentForm 
            commentFormBody={props.commentFormBody}
            handleFormChange={props.handleFormChange}
            handleFormSubmit={props.handleFormSubmit}
            />
            <div id={"comment-list"}>
            {props.selectedLineComments.map(comment => {
            return <Comment 
            key={comment.id} 
            commentBody={comment.body}
            deleteComment={props.deleteComment}
            commentId={comment.id}
            />})}
            </div>
        </div>
    )
}

export default CommentContainer