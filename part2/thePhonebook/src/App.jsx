import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:123456 }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject={
      name:newName,
      number:newNumber
    }
    //if filter method returns something the name has already been entered
    if((persons.filter((person) => person.name === personObject.name).length>0)){
      alert(`${personObject.name} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObject))
    }
  }

  const Person = (props) => {
    return(
      <>
        <li>{props.name} {props.number}</li>
      </>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          Number : <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
      
    </div>
  )
}

export default App