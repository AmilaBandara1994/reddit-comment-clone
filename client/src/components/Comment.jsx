import React, { useState } from 'react'
import IconBtn from './IconBtn'
import { FaEdit, FaHeart, FaReply, FaTrash } from 'react-icons/fa'
import { usePost } from '../context/PostContext'
import CommentList from './CommentList'

const dateFormatter = new Intl.DateTimeFormat(undefined, {dateStyle: "medium", timeStyle:"short"})
const Comment = ({id, message, user, createdAt}) => {
  const {getReplies } = usePost()
  const childComents = getReplies(id)
  const [areChildrenhidden, setAreChildrenHidden] = useState(false)
  const [isReplying, setIsReplying] = useState(false)

  return (
      <>
      <div className='comment'>
        <div className="header">
            <span className='name'> {user.name}</span>
            <span className='date'> {dateFormatter.format(Date.parse(createdAt))}</span>
        </div>
        <div className="message">
          {message}
        </div>
        <div className="footer">
          <IconBtn Icon={FaHeart}  arial-lable="like" color={"blue"}>
            2
          </IconBtn>
          <IconBtn Icon={FaReply} isActive={isReplying} onClick={() => setIsReplying(prev => !prev)} arial-lable={isReplying? "Cancel Reply" : "Reply"} color={"blue"} />
          <IconBtn Icon={FaEdit}  arial-lable="Reply" color={"blue"} />
          <IconBtn Icon={FaTrash}  arial-lable="Reply" color={"red"} />
        </div>
      </div>
      {
        childComents?.length >0 && (
          <>
            <div className={` comments nested-comments-stack ${areChildrenhidden ? "hide": ""}`}>
              <button className='collapse-line' arial-label="Hide Replies" onClick={()=>setAreChildrenHidden(true)} />
              <div>
                <CommentList comments={childComents} />
              </div>
            </div>

            <button className={`btn  ${!areChildrenhidden ? "hide" : ""}`} onClick={() =>setAreChildrenHidden(false)} >Show Replies</button>
          </>
        )
      }
    </>
  )
}

export default Comment