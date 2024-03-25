import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
//import { filterReducer } from '../reducers/filterReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote) //use selector will extract state from store. Here all anecdotes are extracted
    const dispatch = useDispatch() // useDipatch sends actions to store

    const vote = (id) => { // this function will send an action to reducer with dispatch.
        dispatch(voteAnecdote(id))
    }

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const filteredAnecdotes = useSelector(({ filter }) => {
        
        if (filter === null) {
            return sortedAnecdotes
        }
        const filtered = sortedAnecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter)
        );
        return filtered
    
    })
    return (
        <div>
            {
                filteredAnecdotes.map(anecdote =>
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
};






export default AnecdoteList