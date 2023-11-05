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
    // Store votes of most voted annecdote 
    const [maxVotes, setMaxVotes] = useState(0)
    // Store the mostVoted anecdote
    const [bestAnecdote, setBestAnecdote] = useState(0)
  
  
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
    mostVotedAnecdotes(copy)
  }

  function mostVotedAnecdotes (arr){
    let max = arr[0]
    let index = 0
    for (let i=0; i<arr.length;i++){
      if(arr[i]>max){
        max=arr[i]
        index = i
      }
    }
    setBestAnecdote(index)
    setMaxVotes(max)
  }
  
  //Components
  const Button = (props) => {
    return (
      <button onClick={props.action}>{props.text}</button>
    )
  }


  const BestAnecdote = () => {
    if(maxVotes===0){
      return(
        <p>Please vote for you favorite anecdote</p>
      )
    }
    else {
      return(
        <div>
          <h2>With {maxVotes} votes, this annecdote is the favorite:</h2>
          <p>{anecdotes[bestAnecdote]}</p>
        </div>
      )
    }  
  }

  return (
    <div>
      <h2>Annecdote of the day:</h2>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes</p>
      <Button text={'Vote'} action={addVote} />
      <Button text={'Next anecdote'} action={getRandomAnecdote} />
      <BestAnecdote />
    </div>
  )
}


export default App
