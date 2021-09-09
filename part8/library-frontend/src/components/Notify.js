import React from 'react'

const Notify = ({ errorMessage }) => {
  const style = {
    display: errorMessage ? 'block' : 'none',
    color: 'red'
  }

  return (
    <div style={style}>
      {errorMessage}
    </div>
  )
}

export default Notify
