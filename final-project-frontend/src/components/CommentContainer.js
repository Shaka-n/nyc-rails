import React from 'react'
import Comment from './Comment.js'
import CommentForm from './CommentForm.js'


const CommentContainer= (props)=>{

    const renderComments = () =>{
        if(props.selectedLineComments && props.selectedLineComments.length>0){
            return props.selectedLineComments.map(comment => {
                return <Comment 
                key={comment.id} 
                commentBody={comment.body}
                deleteComment={props.deleteComment}
                commentId={comment.id}
                />})
        }
    }
    
    return(

        <div className={"comment-container"}>
            {/* {console.log(props.selectedLineComments)} */}
            <CommentForm 
            commentFormBody={props.commentFormBody}
            handleFormChange={props.handleFormChange}
            handleFormSubmit={props.handleFormSubmit}
            />
            <div id={"comment-list"}>
            {renderComments()}
            </div>
        </div>
    )
}

export default CommentContainer