import React from 'react'

const Header = (props) => {
    return (
    <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
    <p>
        {props.caption} {props.value}
    </p>
    )
}

const Content = (props) => {
    return (
    <div>
        <Part caption={props.part1.name} value={props.part1.exercises} />
        <Part caption={props.part2.name} value={props.part2.exercises} />
        <Part caption={props.part3.name} value={props.part3.exercises} />
    </div>
    )
}

const Total = (props) => {
    return (
    <p>Number of exercises {props.number}</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
    <div>
        <Header course={course} />
        <Content
            part1={part1}
            part2={part2}
            part3={part3}
        />
        <Total number={part1.exercises + part2.exercises + part3.exercises} />
    </div>
    )
}

export default App
