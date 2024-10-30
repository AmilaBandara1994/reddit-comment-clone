import React, { useContext, useEffect, useMemo, useState } from "react"
import { useAsync } from "../hooks/useAsync"
import { getPost } from "../services/post"
import { useParams } from "react-router-dom"


const context = React.createContext()

export function usePost(){
    return useContext(context)
}

export function PostProvider({children}){
    const {id} = useParams()
    const {loading, error, value:post } =useAsync(() => getPost(id), [id])
    const [comments, setComment] = useState([])
    const commentsByParentId = useMemo(() => {
        if(comments == null) return []
        const group ={}
        comments.forEach(comment =>{
            group[comment.parentId] ||= []
            group[comment.parentId ].push(comment)
        })
        return group
    },[comments])
    
    useEffect(() => {
        if(post?.comments == null) return
        setComment(post.comments)
    },[post?.comments])


    function getReplies(parentId){
        return commentsByParentId[parentId]
    }

    function createLocalComment({comment}){
        setComment(precomment => {
            return [comment, ...precomment]
        })
    }
    
    return <context.Provider value={{
        post:{id, ...post},
        rootComments: commentsByParentId[null],
        getReplies,
        createLocalComment
    }}>
        { loading?( 
        <h1>Loading... </h1>
        ): error? (
            <h1>{error}</h1>
        ):(
            children
        )}
    </context.Provider>
}