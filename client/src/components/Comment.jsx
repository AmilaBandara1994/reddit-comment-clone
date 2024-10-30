import React, { useState } from 'react'
import IconBtn from './IconBtn'
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from 'react-icons/fa'
import { usePost } from '../context/PostContext'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { useAsyncFn } from '../hooks/useAsync'
import { createComment, deleteComment, toggleCommentLike, updateComment } from '../services/comments'
import { useUser } from '../hooks/useUser'

const dateFormatter = new Intl.DateTimeFormat(undefined, {dateStyle: "medium", timeStyle:"short"})
const Comment = ({id, message, user, createdAt, likeCount, likedByMe}) => {
  const {post , 
    getReplies , 
    createLocalComment, 
    updateLocalComment, 
    deleteLocalComment ,
    toggleLocalCommentLike
  
  } = usePost()
  const childComments = getReplies(id)
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const createCommentFn = useAsyncFn(createComment)
  const updateCommentFn = useAsyncFn(updateComment)
  const deleteCommentFn = useAsyncFn(deleteComment)
  const toggleLikeCommentFn = useAsyncFn(toggleCommentLike)
  const currentUser = useUser()

  function onCommentReply(message){
    return createCommentFn
    .execute({postId: post.id, message,parentId: id})
    .then(comment => {
        setIsReplying(false)
        createLocalComment(comment)
      }
    )
  }

  function onCommentUpdate(message){
    return createCommentFn.execute({postId: post.id, message, id}).then(
      comment => {
        setIsReplying(false)
        updateLocalComment(id,comment.message)
      }
    )
  }

  function onCommentDelete(){
    return deleteCommentFn.execute({postId: post.id,  id})
    .then(comment => deleteLocalComment(comment.id) )
  }

  function onToggleCommentLike(){
    return toggleLikeCommentFn.execute({id, postId: post.id}).then(({addLike}) => toggleLocalCommentLike(id, addLike))
  }

  return (
      <>
      <div className='comment'>
        <div className="header">
            <span className='name'> {user.name}</span>
            <span className='date'> {dateFormatter.format(Date.parse(createdAt))}</span>
        </div>
        {
          isEditing ? <CommentForm autoFocus initialValue={message} 
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
           onSubmit={onCommentUpdate}/> :
        <div className="message">
          {message}
        </div>
        }
        <div className="footer">
          <IconBtn 
            onClick={onToggleCommentLike}
            disabled={toggleLikeCommentFn.loading}
            Icon={likedByMe ? FaHeart : FaRegHeart}  
            arial-lable={ likedByMe ? "Unlike":"like"} 
            color={"blue"}>
            {likeCount}
          </IconBtn>


          <IconBtn 
            Icon={FaReply} 
            isActive={isReplying} 
            onClick={() => setIsReplying(prev => !prev)} 
            arial-lable={isReplying? "Cancel Reply" : "Reply"} color={"blue"} 
            />

            {user.id === currentUser.id && (
              <>           
              <IconBtn 
                Icon={FaEdit} 
                color={"blue"} 
                onClick={() => setIsEditing(prev => !prev)}
                arial-lable={isReplying? "Cancel Edit" : "Edit"}
              />

              <IconBtn 
              Icon={FaTrash}  
              color={"red"}
              disabled={deleteCommentFn.loading}
              onClick={onCommentDelete}
              arial-lable="Delete" 
              />
           </>
          )}
        </div>
        {
          deleteCommentFn.error && (
              <div className="error-msg">{deleteCommentFn.error}</div>
        )}
      </div>
      {
        isReplying && (
          <div>
            <CommentForm  
            autoFocus
            onSubmit={onCommentReply} 
            loading={createCommentFn.loading} 
            error={createCommentFn.error}
            />
          </div>
        )
      }
      {
        childComments?.length >0 && (
          <>
            <div className={` comments nested-comments-stack ${areChildrenHidden ? "hide": ""}`}>
              <button className='collapse-line' arial-label="Hide Replies" onClick={()=>setAreChildrenHidden(true)} />
              <div>
                <CommentList comments={childComments} />
              </div>
            </div>

            <button className={`btn  ${!areChildrenHidden ? "hide" : ""}`} onClick={() =>setAreChildrenHidden(false)} >Show Replies</button>
          </>
        )
      }
    </>
  )
}

export default Comment