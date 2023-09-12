import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  author: String,
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: String
  }]
})

blogSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id
    delete obj._id
    delete obj.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
