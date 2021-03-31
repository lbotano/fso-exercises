import React, { useState } from 'react'

function Button({ text, handler }) {
    return (
    <button onClick={handler}>
        {text}
    </button>
    )
}

function Buttons({ goodHandler, neutralHandler, badHandler }) {

    return (
    <div>
        <Button text={"good"} handler={goodHandler} />
        <Button text={"neutral"} handler={neutralHandler} />
        <Button text={"bad"} handler={badHandler} />
    </div>
    )
}

function Statistic({ text, value }) {
    return (
        <p>{text} {value}</p>
    )
}

function Statistics({ good, neutral, bad }) {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
        <div>
            <p>No feedback given</p>
        </div>
        )
    }

    return (
    <div>
        <Statistic text={"good"} value={good} />
        <Statistic text={"neutral"} value={neutral} />
        <Statistic text={"bad"} value={bad} />
        <Statistic text={"average"} value={(good - bad) / (good + neutral + bad)} />
        <Statistic text={"positive"} value={good / (good + neutral + bad) * 100 + "%"} />
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
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    )
}

export default App
