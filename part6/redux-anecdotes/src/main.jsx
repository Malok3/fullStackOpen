import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { reducer } from './reducers/anecdoteReducer'


const store = createStore(reducer) //creates redux store with reducer as argument. App state will be saved in store

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)