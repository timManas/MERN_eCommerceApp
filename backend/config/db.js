// This is the database configuration JS file
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline) // Note you can do .cyan.underline is because of the colors package
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1) // exit(1) - means you return with error
  }
}

export default connectDB
