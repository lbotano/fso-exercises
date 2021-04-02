import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>    
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {
                course.parts.map((part) =>
                    <Part part={part} key={part.id} />)
            }
        </div>
    )
}

const Total = ({ course }) => {
    const total = course.parts.reduce((accu, part) => accu + part.exercises, 0)

    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}


export default Course
