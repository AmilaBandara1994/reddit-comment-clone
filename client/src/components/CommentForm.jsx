import React, { useState } from 'react'

const CommentForm = ({loading, error, onSubmit, autoFoucus=false, initialValue=""}) => {
    const [message, setMessage] = useState(initialValue)
    function handleSubmit(e){
        e.preventDefault()
        onSubmit(message).then(() => setMessage(""))
    }
  return (
    <form onSubmit={handleSubmit}>
        <div className='comment-form-row'>
            <textarea autoFocus={autoFoucus} value={message} className='message-input' onChange={e => setMessage(e.target.value)}/>
            <button className='btn' type='submit' disabled={loading}>{loading ? "Loading" : "Post"}</button>
        </div>
        <div className="error-msg">{error}</div>
    </form>
  )
}

export default CommentForm