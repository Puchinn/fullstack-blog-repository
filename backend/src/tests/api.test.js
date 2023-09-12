import supertest from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
import User from '../models/user'
import Blog from '../models/blog'
const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany()
  await Blog.deleteMany()
})

const newUser = {
  user: 'Esteban',
  username: 'Puchin',
  password: 'password'
}

const estebanUser = {
  username: 'Puchin',
  password: 'password'
}

describe('getting started in happypath', () => {
  test('signup in the app', async () => {
    await api
      .post('/auth/signup')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('the registered user is expected', async () => {
    const user = await User.findOne({ user: 'Esteban' })
    expect(user).toHaveProperty('user', 'Esteban')
    const res = await api
      .get(`/api/users/${user._id}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('user', 'Esteban')
  })

  test('login in the app', async () => {
    await api
      .post('/auth/login')
      .send(estebanUser)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('the user can create a blog', async () => {
    const res = await api
      .post('/auth/login')
      .send(estebanUser)
      .expect(200)

    const token = res.headers.token
    expect(token.length).toBeGreaterThan(1)

    const newBlog = {
      title: 'new blog from tests',
      url: 'users_api.test.js',
      author: 'Puchincito'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(200)
  })

  test('the db has the created blog', async () => {
    const blog = await Blog.findOne({ title: 'new blog from tests' })
    expect(blog).toHaveProperty('title', 'new blog from tests')
    expect(blog).toHaveProperty('url', 'users_api.test.js')
    expect(blog).toHaveProperty('author', 'Puchincito')
    await blog.populate('user')
    expect(blog.user.user).toBe('Esteban')
  })

  test('the user can delete a blog', async () => {
    const theOnlyBlog = await Blog.findOne({ title: 'new blog from tests' })

    const res = await api
      .post('/auth/login')
      .send(estebanUser)
      .expect(200)

    const token = res.headers.token
    expect(token.length).toBeGreaterThan(1)

    await api
      .delete(`/api/blogs/${theOnlyBlog._id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200)
  })
  test('the db delete the blog', async () => {
    const blog = await Blog.findOne({ title: 'new blog from tests' })
    expect(blog).toBeNull()
  })
})

describe('bad requests', () => {
  test('fails with invalid data on signup', async () => {
    const invalidUser = {
      user: 'lucas',
      noProperty: false,
      password: '',
      username: ''
    }
    await api
      .post('/auth/signup')
      .send(invalidUser)
      .expect(400)
  })
  test('the database does not create the user', async () => {
    const user = await User.findOne({ user: 'lucas' })
    expect(user).toBeNull()
  })

  test('login fails with wrong data', async () => {
    const invalidData = {
      username: "i'm not exist",
      password: 'me too'
    }
    await api
      .post('/auth/login')
      .send(invalidData)
      .expect(404)

    const invalidPassword = {
      username: 'Puchin',
      password: 'wrong password'
    }

    const res = await api
      .post('/auth/login')
      .send(invalidPassword)
      .expect(400)

    expect(res.body).toHaveProperty('error', 'invalid password')
  })

  test('create a blog without token fails', async () => {
    const newBlog = {
      title: "this blog can't be created",
      url: 'no url',
      author: 'nobody'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blog = await Blog.findOne({ author: 'nobody' })
    expect(blog).toBeNull()
  })

  test('create a blog fails with wrong data', async () => {
    const res = await api
      .post('/auth/login')
      .send(estebanUser)
      .expect(200)

    const token = res.headers.token

    const wrongBlog = {
      title: '',
      noProperty: 0,
      url: 120,
      author: 'esteban'
    }

    await api
      .post('/api/blogs')
      .send(wrongBlog)
      .set('authorization', `Bearer ${token}`)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
