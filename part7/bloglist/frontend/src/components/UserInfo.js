import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import { ListGroup } from 'react-bootstrap'

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
      <div className="mt-3">
        <h1 className="fw-bold">Added blogs</h1>
        <h2>{user.name}</h2>
        <ListGroup>
          {
            blogs
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
              ))
          }
        </ListGroup>
      </div>
    )
    : (
      <div className="mt-3">
        User does not exist
      </div>
    )
}

export default UserInfo
