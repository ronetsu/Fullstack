import {useEffect, useState } from 'react'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [subString, setSubString] = useState('')

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
      }

    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old
      number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService.update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(prevPersons => prevPersons.map(p => p.id !== person.id ? p : returnedPerson))
          setFilteredPersons(prevPersons => prevPersons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
      console.log(persons)
    } else {
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(persons.concat(returnedPerson));
          console.log(returnedPerson)
          setNewName('')
          setNewNumber('')
        })
      }
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setFilteredPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const searchString = event.target.value;
    setSubString(searchString);

    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchString.toLowerCase()))
    setFilteredPersons(filtered);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={subString} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handlePersonChange={handlePersonChange} 
        newNumber={newNumber} 
        handleNumber={handleNumber} />
      <h2>Numbers</h2>
      <Phonebook persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )

}

export default App