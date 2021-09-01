import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import './index.css'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { notify } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    const getBlogs = async () => {
      let blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login(username, password)

      if (user.status === 200) {
        setUser(user.data)
        setUsername('')
        setPassword('')
        blogService.setToken(user.data.token)
      }

      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user.data))
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 401) {
        dispatch(notify('Wrong username or password', true))
      } else {
        dispatch(notify('Cannot login: server might not be running', true))
      }
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogListUser')
  }

  const createBlog = async (blogTitle, author, url) => {
    try {
      await blogService.create({
        title: blogTitle,
        author: author,
        url: url
      })

      blogFormRef.current.toggleVisibility()

      dispatch(notify(`a new blog ${blogTitle} by ${author} created`))
    } catch (error) {
      dispatch(notify('error adding blog', true ))
    }
  }

  const blogLike = (blog) => {
    const blogList = blogs.map(val => val.id === blog.id ? blog : val)
    setBlogs(blogList)
  }

  const blogRemove = (blog) => {
    setBlogs(blogs.filter(val => val.id !== blog.id))
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <Notification />
      <form id="login" onSubmit={ event => {
        event.preventDefault()
        login(username, password)
      }} >
        username
        <input
          id="login-username"
          type="text"
          value={username}
          onChange={ event => setUsername(event.target.value) } />
        <br />
        password
        <input
          id="login-pass"
          type="password"
          value={password}
          onChange={ event => setPassword(event.target.value) } />
        <br />
        <input id="login-submit" type="submit" value="login" />
      </form>
    </>
  )

  const blogForm = () => (
    <>
      <h2>blogs</h2>
      <Notification />
      <div>{user.name} logged in<button onClick={logout}>logout</button></div><br />
      <h2>create new</h2>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} onLike={blogLike} onRemove={blogRemove}/>
      )}
    </>
  )

  return (
    <>
      { user === null ? loginForm() : blogForm() }
    </>
  )
}

export default App
