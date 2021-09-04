import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const uploadComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blogId, comment))
    setComment('')
  }

  return (
    <Form onSubmit={uploadComment} className="mb-3">
      <Form.Group className="d-flex">
        <Form.Control type="text" onChange={(event) => setComment(event.target.value)} size="sm" />
        <Button variant="primary" type="submit" size="sm">
          submit
        </Button>
      </Form.Group>
    </Form>
  )
}

export default CommentForm
