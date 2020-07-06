import React from 'react'

const CommentForm = (props)=>{
    
    return(
        <div id={'comment-form'}>
            <form onSubmit={e => props.handleFormSubmit(e)}>
                <input 
                type="textarea" 
                onChange={e => 
                props.handleFormChange(e)}
                value={props.commentFormBody}
                style={{height:"100px", width:"400px"}}
                />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CommentForm