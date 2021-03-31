import React, { useState } from 'react'

function Buttons({ goodHandler, neutralHandler, badHandler }) {

    return (
    <div>
        <button onClick={goodHandler}>good</button>
        <button onClick={neutralHandler}>neutral</button>
        <button onClick={badHandler}>bad</button>
    </div>
    )
}

function Labels({ good, neutral, bad }) {
    return (
    <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>average {(good - bad) / (good + neutral + bad)}</p>
        <p>positive {good / (good + neutral + bad) * 100}%</p>
    </div>
    )
}

function App() {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodHandler = () => setGood(good + 1)
    const neutralHandler = () => setNeutral(neutral + 1)
    const badHandler = () => setBad(bad + 1)

    return (
    <div>
        <h1>give feedback</h1>
        <Buttons goodHandler={goodHandler} neutralHandler={neutralHandler} badHandler={badHandler} />
        <h1>statistics</h1>
        <Labels good={good} neutral={neutral} bad={bad} />
    </div>
    )
}

export default App
