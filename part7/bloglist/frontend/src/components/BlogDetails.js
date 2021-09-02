import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { voteBlog, deleteBlog } from '../reducers/blogsReducer'

const BlogDetails = () => {
  const routeMatch = useRouteMatch('/blogs/:blogId')
  const blogId = routeMatch ? routeMatch.params.blogId : null

  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blogs.find((el) => el.id === blogId))
  const loggedUsername = useSelector((state) => state.user.username)


  const showDeleteStyle =
    {
      display: blog && loggedUsername === blog.user.username ? 'block' : 'none'
    }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return blog
    ? (
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes
        <button onClick={() => dispatch(voteBlog(blog))}>like</button><br />
        added by {blog.user.name}<br />
        <button onClick={remove} style={showDeleteStyle}>remove</button>
      </div>
    )
    : (
      <div>
        Blog does not exist.
      </div>
    )
}

export default BlogDetails
