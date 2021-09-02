import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from './Notification'
import { logout } from '../reducers/userReducer'

const Header = () => {
  const styles = {
    background: '#e0e0e0',
    padding: '.5em'
  }
  const marginStyle = {
    margin: '0 .25em'
  }

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <>
      <header style={styles}>
        <Link to="/" style={marginStyle}>blogs</Link>
        <Link to="/users" style={marginStyle}>users</Link>
        <span style={marginStyle}>{user.name} logged in</span>
        <button onClick={() => dispatch(logout())} style={marginStyle}>logout</button>
      </header>
      <Notification />
      <h2>blog app</h2>
    </>
  )
}

export default Header
