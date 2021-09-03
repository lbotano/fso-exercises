import userService from '../services/users'
import { getAllBlogs } from './blogsReducer'

const userListReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_USER_LIST':
    return action.data
  default:
    return state
  }
}

export const getUsers = () => {
  return async (dispatch, getState) => {
    // Update the blog list
    await dispatch(getAllBlogs())
    const blogs = getState().blogs

    // Get how many post each user has
    const asObject = blogs.reduce((prev, curr) => {
      if (!Object.prototype.hasOwnProperty.call(prev, curr.user.username)) {
        prev[curr.user.username] = {
          name: curr.user.name,
          count: 0
        }
      }
      prev[curr.user.username].count++
      return prev
    }, {})

    const userList = await userService.getAll()
    let usersWithPosts = Object.keys(asObject).map((username) => ({
      username,
      name: asObject[username].name,
      count: asObject[username].count
    }))

    // Add users without posts
    userList.forEach((user) => {
      if (!usersWithPosts.some((usr) => usr.username === user.username)) {
        usersWithPosts.push({
          username: user.username,
          name: user.name,
          count: 0
        })
      }
    })

    dispatch({
      type: 'SET_USER_LIST',
      data: usersWithPosts
    })
  }
}

export default userListReducer
