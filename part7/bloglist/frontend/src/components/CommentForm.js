import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const uploadComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blogId, comment))
    setComment('')
  }

  return (
    <form onSubmit={uploadComment}>
      <input type="text" onChange={(event) => setComment(event.target.value)} />
      <input type="submit" />
    </form>
  )
}

export default CommentForm
