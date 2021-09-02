import React from 'react'

const Blog = ({ blog }) => {
  const boxStyle = {
    border: '2px solid #000',
    margin: '5px 0',
    padding: '2px'
  }
  return (
    <div style={boxStyle}>
      <a href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</a>
    </div>
  )
}

export default Blog
