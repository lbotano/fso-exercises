import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllBlogs } from '../reducers/blogsReducer'

const Users = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  const reduceUserData = () => {
    let asObject = blogs.reduce((prev, curr) => {
      if (!Object.prototype.hasOwnProperty.call(prev, curr.user.username)) {
        prev[curr.user.username] = {
          name: curr.user.name,
          count: 0
        }
      }
      prev[curr.user.username].count++
      return prev
    }, {})

    return Object.keys(asObject).map((username) => ({
      username,
      name: asObject[username].name,
      count: asObject[username].count
    }))
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            reduceUserData().map((userData) => (
              <tr key={userData.username}>
                <td>
                  <Link to={`/users/${userData.username}`}>{userData.name}</Link>
                </td>
                <td>{userData.count}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users
