import { Router } from 'express'
import * as blogsController from '../controllers/blogs.controller'
import { validateToken } from '../middlewares/validateToken'
import { validateUserInDb } from '../middlewares/validateUserInDb'
import { validateBlogAtPost } from '../middlewares/validateBlogAtPost'
import { validateBlogInUser } from '../middlewares/validateBlogInUser'
import 'express-async-errors'

const blogsRouter = Router()

blogsRouter.get('/', blogsController.getBlogs)
blogsRouter.get('/:id', blogsController.getBlogById)
blogsRouter.post('/', [validateToken, validateUserInDb, validateBlogAtPost], blogsController.postBlog)
blogsRouter.delete('/:id', [validateToken, validateUserInDb, validateBlogInUser], blogsController.deleteBlogById)
blogsRouter.put('/:id', [validateToken, validateUserInDb, validateBlogInUser], blogsController.updateLikes)
blogsRouter.post('/:id/comments', [validateToken, validateUserInDb], blogsController.commentBlogById)

export { blogsRouter }
