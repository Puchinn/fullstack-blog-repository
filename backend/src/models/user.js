import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    minLength: 3
  },
  username: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id
    delete obj._id
    delete obj.__v
    delete obj.passwordHash
  }
})

userSchema.statics.savePasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash)
}

const User = mongoose.model('User', userSchema)

export default User
