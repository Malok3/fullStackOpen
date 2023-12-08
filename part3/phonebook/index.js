require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')


// Middlewares
app.use(express.json()); //parse incoming request body as JSON
app.use(cors()) //use and allow for requests from all origins:
app.use(express.static('dist'))


// Create a custom token named postData
morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});


//Configure morgan so that it also shows the data sent in HTTP POST requests
const custom = ':method :url :status :res[content-length] - :response-time ms :postData';
app.use(morgan(custom));


//Routes: defined to handle different types of HTTP requests
app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({}).then(persons => {
      response.send(
          `
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${date}</p>
          `
      )
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})
  
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log('lol', error)
      response.status(400).send({ error: 'malformatted id' })
    })
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


//Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)


// Starting the server
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
