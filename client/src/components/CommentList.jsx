import React from 'react'
import Comment from './Comment'

const CommentList = ({comments}) => {
  return comments.map(comment => (
    <div key={comment.id}>        
        <Comment {...comment} />
    </div>
  ))
}

export default CommentList