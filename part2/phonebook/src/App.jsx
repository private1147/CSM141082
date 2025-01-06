import { useState } from 'react'

const Persons = ({ persons }) => {
  return (
    persons.map((personObject) => <p key={personObject.id}>{personObject.name} {personObject.number}</p>)
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase() ) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App