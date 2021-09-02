import React, { useState, useEffect, useRef } from 'react'
import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, setBlogs } from './reducers/blogsReducer'
import { login, setUser, logout } from './reducers/userReducer'

import './index.css'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import BlogDetails from './components/BlogDetails'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) =>
    state.blogs
      .sort((a, b) => b.likes - a.likes)
  )
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(async () => {
    const serviceBlogs = await blogService.getAll()
    dispatch(setBlogs(serviceBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      console.log('logged', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const addBlog = async (blogTitle, author, url) => {
    dispatch(createBlog(blogTitle, author, url))
    blogFormRef.current.toggleVisibility()
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <Notification />
      <form id="login" onSubmit={(event) => {
        event.preventDefault()
        dispatch(login(username, password))
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

  const userInfoRouteMatch = useRouteMatch('/users/:username')
  const userInfoUsername = userInfoRouteMatch
    ? userInfoRouteMatch.params.username
    : null

  const blogDetailsRouteMatch = useRouteMatch('/blogs/:blogId')
  const blogDetailsBlogId = blogDetailsRouteMatch
    ? blogDetailsRouteMatch.params.blogId
    : null

  const blogForm = () => (
    <>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in<br />
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>
      <Switch>
        <Route path="/users/:username">
          <UserInfo username={userInfoUsername} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:blogId">
          <BlogDetails blogId={blogDetailsBlogId} />
        </Route>
        <Route path="/">
          <h2>create new</h2>

          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </Route>
      </Switch>
    </>
  )

  return (
    <>
      { user === null ? loginForm() : blogForm() }
    </>
  )
}

export default App
