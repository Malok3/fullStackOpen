import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0)
  
  //creates an array of 8 filled with 0
  const points = Array(8).fill(0)
  const copy = { ...points }

  function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getRandomAnecdote = () => {
    let randomNumber = generateRandomInteger(0, anecdotes.length-1)
    //avoids to render the same anecdote twice in a row 
    if (randomNumber === selected){
      getRandomAnecdote()
    }
    else {
      setSelected(randomNumber)
    }
  }

  const addVote = () => {
    setVote(vote+1)
    copy[selected] += 1
    console.log(copy)
  }

  //Components
  const Button = (props) => {
    return (
      <button onClick={props.action}>{props.text}</button>
    )
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {vote} votes</p>
      <Button text={'Vote'} action={addVote} />
      <Button text={'Next anecdote'} action={getRandomAnecdote} />
    </div>
  )
}


export default App
