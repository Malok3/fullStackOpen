import { useSelector, useDispatch } from 'react-redux'

import { createStore } from 'redux'
import { createAnecdote, reducer } from './reducers/anecdoteReducer'

const store = createStore(reducer) //creates redux store with reducer as argument. App state will be saved in store


//const generateId = () =>  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  const anecdotes = useSelector(state => state) //use selector will extract state from store. Here all anecdotes are extracted
  const dispatch = useDispatch() // useDipatch sends actions to store
  
  const vote = (id) => { // this function will send an action to reducer with dispatch.
    dispatch({
      type: 'VOTE',
      data:{id} // include the ID of the anecdote
    }) 
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App