import React, { useState, useEffect } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'


const App = () => {
    const [ searchValue, setSearchValue ] = useState("")
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState("")
    const [ newNumber, setNewNumber ] = useState("")
    const [ message, setMessage ] = useState(null)

    const getPersonsToShow = () => searchValue === ""
        ? persons
        : persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()))

    useEffect(() => {
        personsService
            .getAll()
            .then( response => setPersons(response.data))
    }, []);
    
    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} />
            <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
            <h2>add a new</h2>
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber} 
                setMessage={setMessage}
            />
            <h2>Numbers</h2>
            <PersonList
                persons={persons}
                setPersons={setPersons}
                shownPersons={getPersonsToShow()}
                setMessage={setMessage}
            />
        </div>
    )
}

export default App
