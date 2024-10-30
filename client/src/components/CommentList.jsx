import React from 'react'
import Comment from './Comment'

const CommentList = ({comments}) => {
  return comments.map(comment => (
    <div key={comment.id}>
        {console.log(comment)}
        
        <Comment {...comment} />
    </div>
  ))
}

export default CommentList