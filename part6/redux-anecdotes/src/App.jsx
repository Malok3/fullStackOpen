//import { createStore } from 'redux'
import {AnecdoteForm} from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
//import { reducer } from './reducers/anecdoteReducer'

//const store = createStore(reducer) //creates redux store with reducer as argument. App state will be saved in store

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
       <AnecdoteForm />
    </div>
  )
}

export default App