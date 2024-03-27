import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
//import { anecdoteReducer } from './reducers/anecdoteReducer'
//import {anecdoteReducer} from './reducers/anecdoteReducer'
//import anecdoteReducer, { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import {filterReducer} from './reducers/filterReducer'


const store = configureStore({ //creates redux store with reducer as argument. App state will be saved in store
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
