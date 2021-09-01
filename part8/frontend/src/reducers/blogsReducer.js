const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'DELETE_BLOG':
    return state.filter((blog) => blog.id !== action.data)
  case 'VOTE_BLOG':
    return state.map((blog) => blog.id === action.data
      ? { ...blog, likes: blog.likes + 1 }
      : blog
    )
  default:
    return state
  }
}

export default blogReducer
