import React from 'react'

const Blog = ({ blog }) => {
  return (
    <a href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</a>
  )
}

export default Blog
