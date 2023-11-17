import { useState } from 'react'

import Filter  from './components/filter'
import PersonForm  from './components/personForm'
import Persons from './components/persons'

const App = () => {

  // States
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:123456, id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  

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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} onChangeFilter={handleSearchChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} onChangeName={handleNameChange} 
        newNumber={newNumber} onChangeNumber={handleNumberChange}
        persons={persons} setPersons={setPersons}
      />
     
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App

