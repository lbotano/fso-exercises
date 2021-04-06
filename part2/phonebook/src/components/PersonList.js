import React from 'react'

import personsService from '../services/persons'

const PersonList = ({ persons, setPersons, shownPersons }) => {
    const deletePerson = person => {
        if (window.confirm(`Delete ${person.name}`))
            personsService.remove(person)
        const newPersons = persons.filter(p => p.id !== person.id)
        setPersons(newPersons)
    }

    return (
        <div>
            { 
                shownPersons.map((person) =>
                    <div key={person.name}>
                        {person.name} {person.number}
                        <button onClick={() => {deletePerson(person)}}>delete</button>
                    </div>
                )
            }
        </div>
    )
}

export default PersonList
