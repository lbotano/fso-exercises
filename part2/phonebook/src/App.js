import React, { useState, useEffect } from 'react'

import personsService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'


const App = () => {
    const [ searchValue, setSearchValue ] = useState("")

    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState("")
    const [ newNumber, setNewNumber ] = useState("")

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
            <h2>Phonebook</h2>
            <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
            <h2>add a new</h2>
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber} 
            />
            <h2>Numbers</h2>
            <PersonList
                persons={persons}
                setPersons={setPersons}
                shownPersons={getPersonsToShow()}
            />
        </div>
    )
}

export default App
