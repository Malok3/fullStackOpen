import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state) //use selector will extract state from store. Here all anecdotes are extracted
    const dispatch = useDispatch() // useDipatch sends actions to store
   
    const vote = (id) => { // this function will send an action to reducer with dispatch.
        dispatch(voteAnecdote(id))
      }

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {
            sortedAnecdotes.map(anecdote =>
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