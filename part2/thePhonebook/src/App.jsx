import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter  from './components/filter'
import PersonForm  from './components/personForm'
import Persons from './components/persons'
import personService from './services/persons'

const App = () => {

  // States
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number:123456, id:1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]) 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  

  // Event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  // filter
  const personsToShow = persons.filter(person=> person.name.toLowerCase().includes(newSearch.toLowerCase()))


  //add new person
  
  const addName = (event) => {
    event.preventDefault()
    const personObject={
      name:newName,
      number:newNumber,
      id:persons.length+1,
    }
    //if filter method returns something the name has already been entered
    if((persons.filter((person) => person.name === personObject.name).length>0)){
      alert(`${personObject.name} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObject))
    }

    personService
    .create(personObject)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (id) => {
    const nameToDelete = persons[id-1].name
    //filters the persons contactbook by id and returns a new array without the person
    const newpersons = persons.filter(person => person.id !== id)
    personService
    .removePerson(id,nameToDelete)
    .then(response => {
      // sets a new state and causes the app to rerender the component
      setPersons(newpersons)
    })
    .catch((err)=>{
      alert("ERROR",err)
    })
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} onChangeFilter={handleSearchChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} onChangeName={handleNameChange} 
        newNumber={newNumber} onChangeNumber={handleNumberChange}
        persons={persons} setPersons={setPersons}
        addName={addName}
      />
     
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

 