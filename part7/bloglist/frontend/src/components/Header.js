import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from './Notification'
import { logout } from '../reducers/userReducer'

import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>Bloglist</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Link to="/" className="nav-link">blogs</Link>
            <Link to="/users" className="nav-link">users</Link>
          </Nav>
        </Navbar.Collapse>
        <div>
          <span className="navbar-text me-3">{user.name} logged in</span>
          <button onClick={() => dispatch(logout())} className="btn btn-danger btn-sm">logout</button>
        </div>
        <Notification />
      </Container>
    </Navbar>
  )
}

export default Header
