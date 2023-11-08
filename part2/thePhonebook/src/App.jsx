import { useState } from 'react'

const PersonForm = (props) => {
  return(
    <>
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.onChangeName}/>
        number : <input value={props.newNumber} onChange={props.onChangeNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}


  
const Persons = (props) => {
  const personsToShow = props.personsToShow
  
  return(
    <>
    <ul>
      {personsToShow.map(person=>
          <Person key={person.id} name={person.name} number={person.number} />
      )}
    </ul> 
  </>
  )
  
}

const Person = (props) => {
  return(
    <>
      <li>{props.name} {props.number}</li>
    </>
  )
}

const Filter = (props) => {
  
  const newSearch = props.newSearch
  const showAll = props.showAll
  const onChangeFilter = props.onChangeFilter

  const handleSearchChange = (event) => {
    onChangeFilter(event.target.value);
  }

  return (
    <>
      Filter shown with <input value={newSearch} onChange={onChangeFilter} />
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:123456, id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState('')
  

  // those functions update the newSearch state variable in response to changes in the search input field.
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (value) => {
    setNewSearch(value);
    setShowAll(value === ''); // Set showAll based on whether the search input is empty
  };


  // by default displayed persons are filtered according to the value in newSearch, if newSearch is empty all persons are displayed
  // once filter inputs change, input value is stored in newSearch, then personsToShow compares newSearch to person.name, then display only the coresponding person
  const personsToShow = showAll
  ? persons
  : persons.filter(person=> person.name.toLowerCase().includes(newSearch.toLowerCase()))

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
  }

  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} showAll={showAll} onChangeFilter={handleSearchChange}/>

      <h2>Add a new</h2>
      <PersonForm onSubmit={addName} 
        newName={newName} onChangeName={handleNameChange} 
        newNumber={newNumber} onChangeNumber={handleNumberChange}
      />
     
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App

