import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUsers } from '../reducers/userListReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userList)

  useEffect(() => {
    dispatch(getUsers())
    console.log(users)
  }, [])

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
            users.map((userData) => (
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
