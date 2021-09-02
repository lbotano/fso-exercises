import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import userService from '../services/users'

const UserInfo = () => {
  const routeMatch = useRouteMatch('/users/:username')
  const username = routeMatch ? routeMatch.params.username : null

  let [user, setUser] = useState(null)

  useEffect(async () => {
    const users = await userService.getAll()
    setUser(users.find((usr) => usr.username === username))
    console.log(user)
  }, [])

  const blogs = useSelector((state) => state.blogs)

  return user
    ? (
      <div>
        <h1>{user.name}</h1>
        <h3>added blogs</h3>
        <ul>
          {
            blogs
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))
          }
        </ul>
      </div>
    )
    : (
      <div>
        User does not exist
      </div>
    )
}

export default UserInfo
