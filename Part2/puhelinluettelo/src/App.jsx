import {useEffect, useState } from 'react'
import Phonebook from './components/Phonebook'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [subString, setSubString] = useState('')

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook!`)
      return
    }
    const personObject = {
      name: newName,
      id: persons.length + 1 ,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <form>
        <div>
          filter shown with <input value={subString}
          onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} 
          onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumber}/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons?.map(person =>
         <Phonebook key={person.id} person={person} /> )}
    </div>
  )

}

export default App