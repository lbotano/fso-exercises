import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

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
      <h2 className="mt-3">Users</h2>
      <Table striped>
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
      </Table>
    </div>
  )
}

export default Users
