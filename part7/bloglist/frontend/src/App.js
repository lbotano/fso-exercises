import React, { useEffect, useRef } from 'react'
import {
  Switch, Route
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

import './index.css'

import Header from './components/Header'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(async () => {
    dispatch(getAllBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      console.log('logged', loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const containerStyle = {
    maxWidth: 900
  }

  return user === null
    ? <div className="container" style={containerStyle}>
      <LoginForm />
    </div>
    : <div className="container" style={containerStyle}>
      <Header />
      <Switch>
        <Route path="/users/:username">
          <UserInfo />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:blogId">
          <BlogDetails />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm onCreateBlog={() => {blogFormRef.current.toggleVisibility()}} />
          </Togglable>
          <BlogList />
        </Route>
      </Switch>
    </div>
}

export default App
