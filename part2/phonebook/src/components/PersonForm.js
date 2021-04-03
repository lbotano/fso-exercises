import React from 'react'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
    function onSubmitName(event) {
        event.preventDefault()

        // Find if that person is already listed
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const newPerson = { name: newName, phone: newNumber }

            setPersons(persons.concat(newPerson))
            setNewName("")
        }
    }

    return (
        <form onSubmit={onSubmitName}>
            <div>
                name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>
                number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
