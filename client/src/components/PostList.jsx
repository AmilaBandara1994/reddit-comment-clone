import React, {useState, useEffect} from 'react'
import { getPosts } from '../services/post';
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync'

const PostList = () => {
    const { loading, error,  value:posts } = useAsync(getPosts)
    // const [ posts, setPosts] = useState([]);
    // useEffect(()=>{
    //     getPosts().then(setPosts)
    // },[])

    if(loading) return <h1>Loading</h1>
    if(error) return <h1>{error}</h1>
    return posts.map(post => (
            <h3 key={post.id}>
              <Link to={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </h3>
         ))
  
}

export default PostList