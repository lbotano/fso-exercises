import React from 'react'
import { useSelector } from 'react-redux'

import { ListGroup } from 'react-bootstrap'

import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) =>
    state.blogs
      .sort((a, b) => b.likes - a.likes)
  )

  return (
    <ListGroup>
      {blogs.map(blog =>
        <ListGroup.Item key={blog.id}>
          <Blog blog={blog} />
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default BlogList
