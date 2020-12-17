import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Compares encrypted password
userSchema.methods.matchPassword = async function (enteresPassword) {
  return await bcrypt.compare(enteresPassword, this.password)
}

// Before we save, we want to encrypt the password
userSchema.pre('save', async function (next) {
  // Check if not modified
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt) // Hashed password
})

const User = mongoose.model('User', userSchema)

export default User
