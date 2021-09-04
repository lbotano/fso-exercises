import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

import { createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ onCreateBlog }) => {
  const dispatch = useDispatch()

  const [blogTitle, setBlogTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog(blogTitle, author, url))
    onCreateBlog()
    setBlogTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={blogTitle}
          onChange={ event => setBlogTitle(event.target.value) } />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={author}
          onChange={ event => setAuthor(event.target.value) } />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>URL</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={url}
          onChange={ event => setUrl(event.target.value) } />
      </Form.Group>
      <Button id="submit" type="submit">
        Create
      </Button>
    </Form>
  )
}

BlogForm.propTypes = {
  onCreateBlog: PropTypes.func.isRequired
}

export default BlogForm
