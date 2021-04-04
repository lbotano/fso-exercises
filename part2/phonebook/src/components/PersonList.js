import React from 'react'

const PersonList = ({ persons }) => {
    return (
        <div>
            { 
                persons.map((person) =>
                    <div key={person.name}>
                        {person.name} {person.number}
                    </div>
                )
            }
        </div>
    )
}

export default PersonList
