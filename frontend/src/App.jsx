import { useDispatch } from 'react-redux'
import { Messages } from './componentes/Messages'
import { useEffect } from 'react'
import { setUser } from './reducers/user.reducer'
import { fetchBlogs } from './reducers/blogs.reducer'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { Home } from './pages/Home'
import { UsersPage } from './pages/Users'
import { UserDetails } from './componentes/UserDetails'
import { User } from './componentes/User'
import { Nav } from './componentes/Nav'
import { Blogs } from './pages/Blogs'
import { BlogDetails } from './componentes/BlogDetail'

function App () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = window.localStorage.getItem('appUser')
    if (!savedUser) {
      return navigate('/login')
    }
    if (savedUser) {
      const user = JSON.parse(savedUser)
      dispatch(setUser(user))
      dispatch(fetchBlogs(user.id))
    }
  }, [])

  return (
    <>
      <User />
      <Nav />
      <Messages />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Home />} />
        <Route path='/users' element={ <UsersPage /> } / >
        <Route path='/users/:id' element={ <UserDetails /> } / >
        <Route path='/blogs' element={ <Blogs /> } / >
        <Route path='/blogs/:id' element={ <BlogDetails /> } / >
      </Routes>
    </>
  )
}

export default App
