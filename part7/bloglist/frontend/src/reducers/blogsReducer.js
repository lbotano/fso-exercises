import blogService from '../services/blogs'
import { notify } from './notificationReducer'

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
  case 'SET_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })

      dispatch(notify(`a new blog ${title} by ${author} created`))
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
      })
    } catch (error) {
      dispatch(notify('error adding blog', true ))
    }
  }
}

export const voteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.like(blog)
      dispatch({
        type: 'VOTE_BLOG',
        data: blog.id
      })
    } catch (error) {
      console.error(error)
      dispatch(notify('error voting blog', true))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    } catch (error) {
      console.error(error)
      dispatch(notify('error deleting blog', true))
    }
  }
}

export const setBlogs = (blogs) => ({
  type: 'SET_BLOGS',
  data: blogs
})

export const getAllBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'SET_BLOGS',
        data: blogs
      })
    } catch (error) {
      dispatch(notify('error getting blogs', true))
    }
  }
}

export default blogReducer
