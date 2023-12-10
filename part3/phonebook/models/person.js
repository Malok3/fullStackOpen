const mongoose = require('mongoose')

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

//validators: check that numbers are in correct format
function numberFormat1 (num){
  return /\d{2}-\d{7}/.test(num)
}
function numberFormat2 (num){
  return /\d{3}-\d{8}/.test(num)
}

const validators = {
  validator: (num) => numberFormat1(num) || numberFormat2(num),
  message: 'Wrong format number, format should be 09-1234556 or 040-22334455'
}



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: validators,
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)