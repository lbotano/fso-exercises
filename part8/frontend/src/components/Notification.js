import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)


  return (
    <div style={{ display: notification.text ? 'block' : 'none' }}
      className={`notification${notification.error ? ' error' : ''}`}>
      {notification.text}
    </div>
  )
}

export default Notification
