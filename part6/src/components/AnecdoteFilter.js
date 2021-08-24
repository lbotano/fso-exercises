import React from 'react'
import { connect } from 'react-redux'
import { filter, unfilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      props.filter(event.target.value)
    } else {
      props.unfilter()
    }
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onInput={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filter,
  unfilter
}

const ConnectedAnecdoteFilter = connect(
  null,
  mapDispatchToProps,
)(AnecdoteFilter)

export default ConnectedAnecdoteFilter
