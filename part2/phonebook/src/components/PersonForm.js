import React from 'react'

import personsService from '../services/persons'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage }) => {
    function onSubmitName(event) {
        event.preventDefault()

        const newPerson = { name: newName, number: newNumber }

        // Check if the name already exists
        const personWithName = 
            persons.find(person => person.name === newPerson.name)
        if (personWithName !== undefined) {
            // Modify phone number
            if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
                personsService.update(personWithName.id, newPerson)
                setPersons(persons.map(person => 
                    person.id === personWithName.id
                    ? {...person, number: newPerson.number}
                    : person
                ))
                setMessage({text: `Modified ${newPerson.name}'s number`, success: true})
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                setNewName("")
                setNewNumber("")
            }
        } else {
            // Add person
             personsService
                .create(newPerson)
                .then((response) => {
                    console.log(response)
                    setPersons(persons.concat(response.data))
                    setMessage({text: `Added ${newPerson.name}`, success: true})
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                    setNewName("")
                    setNewNumber("")
                })
                .catch(error => {
                    alert("Could not add person to the server, see console for details.")
                    console.log(error)
                })
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
