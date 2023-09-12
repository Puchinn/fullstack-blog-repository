import axios from 'axios'
const url = 'http://localhost:3001'

const apiGetBlogs = async () => {
  const res = await axios.get(`${url}/api/blogs`)
  const blogs = await res.data
  return blogs
}

const apiDeleteBlogById = async (id, token) => {
  try {
    const res = await axios.delete(`${url}/api/blogs/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    return res.data
  } catch (error) {
    const jsonError = await error.response.data
    throw jsonError
  }
}

const apiAddBlog = async (blog, token) => {
  const blogJson = JSON.stringify(blog)
  try {
    const res = await axios.post(`${url}/api/blogs`, blogJson, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })

    return res.data
  } catch (err) {
    const json = await err.response.data
    throw json
  }
}

const doLogin = async (data) => {
  const dataJson = JSON.stringify(data)
  try {
    const res = await axios.post(`${url}/auth/login`, dataJson, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.data
    return json
  } catch (err) {
    const json = await err.response.data
    throw json
  }
}

const apiUpdateBlogLikes = async (id, token) => {
  try {
    const res = await axios.put(`${url}/api/blogs/${id}`, {}, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    const json = await res.data
    return json
  } catch (error) {
    const json = await error.response.data
    throw json
  }
}

const apiGetInfoUser = async (id) => {
  const res = await axios.get(`${url}/api/users/${id}`)
  const json = await res.data
  return json
}

const apiGetUsers = async () => {
  const response = await axios.get(`${url}/api/users`)
  return response.data
}

const getBlogById = async (id) => {
  const response = await axios.get(`${url}/api/blogs/${id}`)
  return response.data
}

const commentBlog = async (comment, id, token) => {
  const sendComment = {
    comment
  }
  const response = await axios.post(`${url}/api/blogs/${id}/comments`, sendComment, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export { apiGetBlogs, apiDeleteBlogById, apiAddBlog, doLogin, apiGetInfoUser, apiUpdateBlogLikes, apiGetUsers, getBlogById, commentBlog }
