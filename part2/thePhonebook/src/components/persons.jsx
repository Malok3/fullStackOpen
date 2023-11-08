
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

export default Persons