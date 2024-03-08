import { useSelector, useDispatch } from 'react-redux'

import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer) //creates redux store with reducer as argument. App state will be saved in store

const App = () => {
  const anecdotes = useSelector(state => state) //use selector will extract state from store. Here all anecdotes are extracted
  const dispatch = useDispatch() // useDipatch sends actions to store

  const vote = (id) => { // this function will send an action to reducer with dispatch.
    dispatch({
      type: 'VOTE',
      data:{id} // include the ID of the anecdote
    }) 
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App