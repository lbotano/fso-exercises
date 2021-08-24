const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.content
    case 'RESET_FILTER':
      return initialState
    default:
      return state
  }
}

export const filter = (content) => {
  return {
    type: 'SET_FILTER',
    content
  }
}

export const unfilter = () => {
  return {
    type: 'RESET_FILTER'
  }
}

export default reducer
