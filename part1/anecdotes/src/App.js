import React, { useState } from 'react'

const Anecdote = ({ text, points }) => {
    return(
        <div>
            <p>{text}</p>
            <p>has {points} votes</p>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
    let mostVoted = 0;

    function getMostVoted() {
        let mostVotes = mostVoted
        for (let i = 0; i < anecdotes.length; i++)
            if (points[i] > points[mostVotes])
                mostVotes = i
        mostVoted = mostVotes;
        return mostVotes;
    }

    function onClickVote() {
        const copy = [...points]
        copy[selected]++
        setPoints(copy)
    }

    function onClickRandomAnecdote() {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    }

    return (
    <div>
        <h1>Anecdote of the day</h1>
        <Anecdote text={anecdotes[selected]} points={points[selected]} />
        <button onClick={onClickVote}>vote</button>
        <button onClick={onClickRandomAnecdote}>next anecdote</button>
        <Anecdote text={anecdotes[getMostVoted()]} points={points[getMostVoted()]} /> 
    </div>
    )
}

export default App
