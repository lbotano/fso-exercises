import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { voteBlog, deleteBlog } from '../reducers/blogsReducer'
import CommentForm from './CommentForm'

import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const BlogDetails = () => {
  const history = useHistory()
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
      history.push('/')
    }
  }

  return blog
    ? (
      <main className="pt-3">
        <article className="border p-3 rounded">
          <div className="d-flex flex-column border-bottom pb-3 mb-3">
            <h2 className="fw-bold">{blog.title}</h2>
            <small>added by {blog.user.name}</small>
            <a href={blog.url} className="text-break">{blog.url}</a>
          </div>
          <div className="d-flex align-items-baseline">
            <Button
              onClick={() => dispatch(voteBlog(blog))}
              variant="primary"
              size="sm"
              className="me-1">
              like
            </Button>
            <small>{blog.likes} likes</small>
          </div>
          <Button onClick={remove}
            style={showDeleteStyle}
            variant="outline-danger"
            size="sm"
            className="mt-3">
            remove
          </Button>
        </article>
        <h3 className="mt-3">comments</h3>
        <CommentForm blogId={blogId} />
        <ListGroup>
          {blog.comments.map((comment) => (
            <ListGroupItem key={comment}>{comment}</ListGroupItem>
          ))}
        </ListGroup>
      </main>
    )
    : (
      <div>
        Blog does not exist.
      </div>
    )
}

export default BlogDetails
