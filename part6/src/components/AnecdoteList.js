import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes =
    // Sort the array by votes in descending order
    useSelector(state =>
      state.anecdotes
        .filter((anecdote) => state.filter === null || anecdote.content.includes(state.filter))
        .sort((a, b) => a.votes < b.votes ? 1 : -1)
    )

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(notify(`you voted '${anecdote.content}'`, 10))
  }

  console.log('ANecdotes:', anecdotes)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
