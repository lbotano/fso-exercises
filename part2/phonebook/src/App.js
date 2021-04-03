import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'


const App = () => {
    const [ searchValue, setSearchValue ] = useState("")

    const [ persons, setPersons ] = useState([
        { name: "Arto Hellas", phone: "040-1234567"}
    ]) 
    const [ newName, setNewName ] = useState("")
    const [ newNumber, setNewNumber ] = useState("")

    const getPersonsToShow = () => searchValue === ""
        ? persons
        : persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLowerCase()))
    
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
            <PersonList persons={getPersonsToShow()} />
        </div>
    )
}

export default App
