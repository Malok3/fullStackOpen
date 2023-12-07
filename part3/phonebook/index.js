const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

// Middleware to parse incoming request body as JSON
app.use(express.json());
//Middleware to use and allow for requests from all origins:
app.use(cors())
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


//mongose config: connecting backend to databas
const mongoose = require('mongoose')

const password = process.argv[2]

const personName = process.argv[3]
const personNumber = process.argv[4]

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String
  })
  

const Person = mongoose.model('Person', personSchema)


const person = new Person({
    name: personName,
    number: personNumber
 })
 
// fetch every object in the collection
if (process.argv.length===3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
       mongoose.connection.close()
    })
}

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



//Routes: defined to handle different types of HTTP requests
app.get('/info', (request, response) => {
    const date = new Date()
    const phoneBookLength = persons.length;
    response.send(`
        <p>Phonebook has info for ${phoneBookLength} people</p>
        <p>${date}</p>
    `);
  });

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    //response.json(persons)
    Persons.find({}).then(persons => {
        response.json(persons)
      })
})
  
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const person = request.body
    const duplicatedPerson = (t) => {
        return persons.find(p => p.name === t.name)
    }
    if(person.name  === '' || person.number === ''){
        response.status(400).json({ 
            error: 'Name or number missing' 
          })
    }
    else if (duplicatedPerson(person)){
        response.status(400).json({ 
            error: 'Name must be unique' 
        })
    }
    else {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        const maxId = persons.length > 0
            ? getRandomInt(999999) 
            : 0
    
        
        person.id = maxId + 1
        persons = persons.concat(person)
        response.json(person)
    }
    
})

// Starting the server
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)