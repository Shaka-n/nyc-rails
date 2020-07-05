import React from 'react'

const CommentForm = (props)=>{
    
    return(
        <div id={'comment-form'}>
            <form onSubmit={e => props.handleFormSubmit(e)}>
                <input 
                type="text" 
                onChange={e => 
                props.handleFormChange(e)}
                value={props.commentFormBody}
                />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CommentForm