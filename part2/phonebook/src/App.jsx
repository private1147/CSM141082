import { useState, useEffect } from 'react'
import personServices from './services/persons'

const Persons = ({ persons, showAll, filteredPersons, handleDelete }) => {
  
  if (showAll){
    return (
      persons.map((personObject) => <p key={personObject.id}>{personObject.name} {personObject.number} <button type='submit' value={personObject.id} onClick={handleDelete}>delete</button></p>)
    )
  } else {
    return (
      filteredPersons.map((personObject) => <p key={personObject.id}>{personObject.name} {personObject.number} <button type='submit' onClick={handleDelete}>delete</button></p>)
    )
  }
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

const Filter = ({ filteredName, handleFilteredNameChange }) => {
  return (
    <div>
      filter shown with: <input value={filteredName} onChange={handleFilteredNameChange} />
    </div>
  )
}

function isValidNumber(number) {
  if (number.length === 0) return true
  const newCharCode = number.toLowerCase().charCodeAt(number.length - 1)
  if (newCharCode == 32 || newCharCode == 40 || newCharCode == 41 || newCharCode == 45) return true
  else if (newCharCode >= 49 && newCharCode <= 57) return true
  else return false
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filteredPersons, setFilteredPersons] = useState([])
  const [filteredName, setFilteredName] = useState('')

  const hook = () => {
    // console.log('effect')
    personServices
      .getAll()
      .then(response => {
        console.log(`all persons loaded: ${JSON.stringify(response.data)}`)
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleSubmit = (event) => {
    event.preventDefault() // VERY IMPORTANT FOR PREVENTING RELOADING
    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1
    }
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase() ) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personServices
        .create(personObject)
        .then(response => {
          console.log(`new person created: ${JSON.stringify(response.data)}`)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilteredNameChange = (event) => {
    const newFilteredName = event.target.value
    // console.log(`New filtered name: ${newFilteredName}`)

    if (newFilteredName.replace(' ', '').length === 0) setShowAll(true)
    else {
      setShowAll(false)
      const newFilteredPersons = persons.filter((person) => person.name.toLowerCase().startsWith(newFilteredName.toLowerCase()))
      setFilteredPersons(newFilteredPersons)
    }
    setFilteredName(newFilteredName)

  }

  const handleNumberChange = (event) => {
    const currentNumber = event.target.value
    // console.log(`Current number: ${currentNumber}`)
    if (isValidNumber(currentNumber)) {
      setNewNumber(currentNumber)
    } else {
      alert(`${currentNumber} isn't a valid number due to invalid new character ${currentNumber[currentNumber.length - 1]}`)
    }
  }

  const handleDelete = (event) => {
    const person = persons.find((person) => person.id == event.target.value)
    const id = person.id
    // console.log(`Person: ${JSON.stringify(person)}`)
    if (confirm(`Delete ${person.name} ?`)) {
      personServices
        .deletePerson(id)
        .then((response) => {
          console.log(`deleted the person:${JSON.stringify(response.data)}`)
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter filteredName={filteredName} handleFilteredNameChange={handleFilteredNameChange}/>

      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        showAll={showAll} 
        filteredPersons={filteredPersons} 
        handleDelete={handleDelete}
      />

    </div>
  )
}

export default App