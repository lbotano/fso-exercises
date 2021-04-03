import React, { useState } from 'react'

const PersonList = ({ persons }) => {
    return (
        <div>
            { 
                persons.map((person) =>
                    <div key={person.name}>{person.name}</div>
                )
            }
        </div>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [ newName, setNewName ] = useState('')

    function onSubmitName(event) {
        event.preventDefault()

        // Find if that person is already listed
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newPerson = { name: newName }

            setPersons(persons.concat(newPerson))
            setNewName("")
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={onSubmitName}>
                <div>
                    name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <PersonList persons={persons} />
        </div>
    )
}

export default App
