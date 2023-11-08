
const PersonForm = (props) => {
    const persons = props.persons
    const addName = (event) => {
      event.preventDefault()
      const personObject={
        name:props.newName,
        number:props.newNumber,
        id:props.persons.length+1,
      }
      //if filter method returns something the name has already been entered
      if((persons.filter((person) => person.name === personObject.name).length>0)){
        alert(`${personObject.name} is already added to phonebook`)
      }else{
        props.setPersons(persons.concat(personObject))
      }
    }
  
    return(
      <>
      <form onSubmit={addName}>
        <div>
            name: <input value={props.newName} onChange={props.onChangeName}/>
        </div>
        <div>
            number : <input value={props.newNumber} onChange={props.onChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
    )
  }

export default PersonForm 