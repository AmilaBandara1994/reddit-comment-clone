import React from 'react'
import { usePost } from '../context/PostContext'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import {  useAsyncFn } from '../hooks/useAsync'
import { createComment } from '../services/comments'

const Post = () => {
    const {post , rootComments, createLocalComment} = usePost()
    const {loading, error, execute: createCommentFn} = useAsyncFn(createComment)
    function onCommentCreate(message){
      return createCommentFn({postId:post.id, message}).then(createLocalComment)
    }
  return (
    <>
        <h1>{post.title}</h1>
        <article className='post'>{post.body}</article>
        <h3>Comments</h3>
        <section className='comments'>
        <CommentForm loading={loading} error={error} onSubmit={onCommentCreate} />
            {rootComments != null && rootComments.length > 0 && 
            (
              <div>
                <CommentList comments={rootComments} />
              </div>
            )}
        </section>
    </>
  )
}

export default Post