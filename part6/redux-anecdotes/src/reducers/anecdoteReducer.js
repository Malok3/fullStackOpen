const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => { // transform anecdote into object
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject) // creates a table of anecdotes as object and cotes at 0

const reducer = (state = initialState, action) => { 
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    case 'VOTE': {
      const anecdoteId = action.data.id;
      const updatedAnecdotes = state.map(anecdote => //crawl through each anecdotes in state then find the coresponding id then add +1 vote
        anecdote.id === anecdoteId ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      );
      return updatedAnecdotes;
    }
    default:
      return state;
  }
}


const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId()
    }
  }
}


export { reducer, createAnecdote };