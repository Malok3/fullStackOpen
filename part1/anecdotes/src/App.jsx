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
   
  //States
    const [selected, setSelected] = useState(0)
    // Store the votes of each anecdote in an array
    const [votes, setVote] = useState(new Array(anecdotes.length).fill(0));
  
  
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
    const copy = [...votes];
    copy[selected] += 1;
    setVote(copy);
    mostVotedAnnecdotes();
  }

  function mostVotedAnnecdotes (){
    if (i=0, i<votes.length,i++){
      
    }
  }

  //Components
  const Button = (props) => {
    return (
      <button onClick={props.action}>{props.text}</button>
    )
  }

  return (
    <div>
      <h2>Annecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes</p>
      <Button text={'Vote'} action={addVote} />
      <Button text={'Next anecdote'} action={getRandomAnecdote} />
      <h2>Annecdote with most votes</h2>
      <p>{anecdotes[selected]}</p>
    </div>
  )
}


export default App
