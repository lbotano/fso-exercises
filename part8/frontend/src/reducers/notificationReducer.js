const defaultState = {
  text: null,
  error: true
}

const notificationReducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    console.log(action.data)
    return action.data
  case 'UNSET_NOTIFICATION':
    console.log(defaultState)
    return defaultState
  default:
    console.log(state)
    return state
  }
}

const unsetNotification = () => {
  return {
    type: 'UNSET_NOTIFICATION'
  }
}

let lastTimeoutId
export const notify = (text, error = false) => {
  return async (dispatch) => {
    if (lastTimeoutId) clearTimeout(lastTimeoutId)
    lastTimeoutId = setTimeout(() => {
      dispatch(unsetNotification())
    }, 5000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        text,
        error
      }
    })
  }
}

export default notificationReducer
