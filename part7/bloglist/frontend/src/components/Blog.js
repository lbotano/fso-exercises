import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { voteBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const showStyle = { display: show ? '' : 'none' }
  const removeStyle = { display: user.username === blog.user.username ? '' : 'none' }
  const boxStyle = {
    border: '2px solid #000',
    margin: '5px 0',
    padding: '2px'
  }
  const buttonStyle = { marginLeft: 5 }

  const toggleShow = () => {
    setShow(!show)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div style={boxStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShow} style={buttonStyle}>
        {show ? 'hide' : 'view'}
      </button>
      <div style={showStyle} className="togglableContent">
        {blog.url}<br />
        likes <span className="likes">{blog.likes}</span>
        <button onClick={() => dispatch(voteBlog(blog))}>like</button><br />
        {blog.user.name}<br />
        <button onClick={remove} style={removeStyle}>remove</button>
      </div>
    </div>
  )
}

export default Blog
