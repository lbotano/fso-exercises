const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.content
    case 'RESET':
      return initialState
    default:
      return state
  }
}

let resetTimeout

export const notify = (content, seconds) => {
  return async dispatch => {
    // Reset the timer when a notification is created and the previous one didn't end
    if (resetTimeout !== undefined) {
      clearTimeout(resetTimeout)
    }

    resetTimeout = setTimeout(() => {
      dispatch(resetNotification())
    }, seconds * 1000)
    dispatch({
      type: 'NOTIFY',
      content
    })
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default reducer
