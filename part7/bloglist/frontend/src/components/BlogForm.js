import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
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
    <form onSubmit={addBlog}>
      title:
      <input
        id="title"
        type="text"
        value={blogTitle}
        onChange={ event => setBlogTitle(event.target.value) } /><br />
      author:
      <input
        id="author"
        type="text"
        value={author}
        onChange={ event => setAuthor(event.target.value) } /><br />
      url:
      <input
        id="url"
        type="text"
        value={url}
        onChange={ event => setUrl(event.target.value) } /><br />
      <input id="submit" type="submit" value="create" />
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
