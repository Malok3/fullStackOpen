import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { filterReducer } from '../reducers/filterReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote) //use selector will extract state from store. Here all anecdotes are extracted
    const dispatch = useDispatch() // useDipatch sends actions to store
   
    const vote = (id) => { // this function will send an action to reducer with dispatch.
        dispatch(voteAnecdote(id))
      }
      
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    console.log(sortedAnecdotes)
    
    const anecdotesss = useSelector(({filter, anecdotes}) => {
        if ( filter === null ) {
          return anecdotes
        }
        const regex = new RegExp( filter, 'i' )
        return anecdotes.filter(anecdote => anecdote.content.match(regex))
      })
    
      console.log(anecdotesss)

    return (
        <div>
            {
            anecdotesss.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )
        }
        </div>
    )
}


export default AnecdoteList