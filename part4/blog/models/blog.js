require('dotenv').config()
const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
const Blog = mongoose.model('Blog', blogSchema)

mongoose.set('strictQuery', false)
  
  
const url = process.env.MONGODB_URI
  
console.log('connecting to', url)
  
mongoose.connect(url)
    .then(() => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})


module.exports = mongoose.model('blog', blogSchema)


