import React from 'react'

const Notification = ({ message }) => {
    
    return message === null
        ? null
        : <div className={`notification ${!message.success ? "error" : ""}`}>{message.text}</div>
}

export default Notification
