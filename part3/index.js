const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())

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
app.get('/info', (request, response) => {
    const date = new Date()
    console.log(date)
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
    response.json(persons)
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
    console.log(duplicatedPerson(person))
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


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)