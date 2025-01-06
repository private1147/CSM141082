import { useState } from 'react'

const Persons = ({ persons }) => {
  return (
    persons.map((personObject) => <p key={personObject.id}>{personObject.name}</p>)
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1
    }
    // if (persons.find((person) => person.name.toLowerCase() === newName.toLowerCase() ) !== undefined) {
    //   alert(newName + " is already added to phonebook")
    // } else {
    //   setPersons(persons.concat(personObject))
    //   setNewName('')
    // }
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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