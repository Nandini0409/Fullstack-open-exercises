import axios from 'axios'
import { useEffect, useState } from 'react'
import personsServices from './services/persons'

const Notification = ({ isErrorMessage, message }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: 'green',
    backgroundColor: 'beige',
    borderStyle: 'solid',
    padding: 0,
    borderRadius: 2,
    paddingLeft: 20,
    fontSize: 20,
  }
  if (isErrorMessage) {
    notificationStyle.color = 'red'
  }
  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  )
}

const Title = ({ text }) => {
  return <h2>{text} </h2>
}

const Person = ({ name, onClick, number }) => {
  const personStlyle = {
    display: 'flex',
    gap: 35
  }
  return (
    <div style={personStlyle}>
      <p>{name}</p>
      <p>{number}</p>
      <button onClick={onClick}>Delete</button>
    </div>
  )
}

const Filter = ({ filterPerson, onClick, searchQuery, onSearchInputChange, persons }) => {
  return (
    <div>
      Enter Name to search: <input value={searchQuery} onChange={onSearchInputChange} />
      <button onClick={onClick}>Search</button>
      <p>{filterPerson.name} {filterPerson.number}</p>
    </div>
  )
}

const PersonForm = ({ onClick, newPerson, onNameChange, onNumberChange }) => {
  return (
    <form>
      <div>
        name: <input required value={newPerson.name} onChange={onNameChange} />
      </div>
      <div>
        number: <input required type={'tel'} value={newPerson.number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onClick}>add</button>
      </div>
    </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPerson, setFilterPerson] = useState({ name: '', number: '', id: '' })
  const [message, setMessage] = useState(null)
  const [isErrorMessage, setIsErrorMessage] = useState(false)

  useEffect(() => {
    personsServices
      .getAll()
      .then((personsArray) => {
        setPersons(personsArray);
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    let numerRegex = /^[0-9]{10}$/
    let isUnique = true
    let isValid = true

    if (!numerRegex.test(newPerson.number)) {
      setIsErrorMessage(true)
      showNotification(`${newPerson.number} is not a valid number!`)
      isValid = false
    }

    for (let person of persons) {
      let nameRegex = new RegExp(newPerson.name, 'i')
      if (nameRegex.test(person.name)) {
        isUnique = false
        if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          const updatedPerson = { ...person, number: newPerson.number }
          personsServices
            .update(person.id, updatedPerson)
            .then(() => {
              setPersons(persons.map((e) => (e.id === person.id) ? (e = updatedPerson) : e))
            })
            .then(() => {
              showNotification(`${updatedPerson.name}'s old number is now replaced with ${updatedPerson.number}.`)
            })
            .catch(() => {
              setIsErrorMessage(true)
              showNotification(`${updatedPerson.name} is already removed from the Phonebook.`)
            })
        }
        break
      }
    }

    if (isUnique && isValid) {
      const newId = Date.now() + Math.floor(Math.random() * 1000)
      const updatedPerson = { ...newPerson, id: newId.toString() }
      setNewPerson(updatedPerson)
      setPersons(persons.concat(updatedPerson))
      personsServices
        .create(updatedPerson)
        .then(() => {
          showNotification(`Added ${updatedPerson.name}.`)
        })
        .catch(() => {
          setIsErrorMessage(true)
          showNotification(`Couldn't add person! Please try again.`)
        })
    }
    setNewPerson({ name: '', number: '', id: '' })
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsServices
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(e => e.id !== person.id))
          showNotification(`Removed ${person.name}.`)
        })
        .catch(() => {
          setIsErrorMessage(true)
          showNotification(`${person.name} is already removed from the Phonebook.`)
        })
    }
  }

  const showNotification = (messageArg) => {
    if (!isErrorMessage) {
      setMessage(messageArg)
      setTimeout(() => {
        setMessage(null)
        setIsErrorMessage(false)
      }, 5000);
    }
  }

  const searchHandler = () => {
    const regex = new RegExp(searchQuery, 'i')
    const searchResult = persons.filter((person) => (regex.test(person.name)))
    if (searchResult.length > 0) {
      setFilterPerson({ name: searchResult[0].name, number: searchResult[0].number, id: searchResult[0].id })
    }
    else {
      setIsErrorMessage(true)
      showNotification(`${searchQuery} not found in the Phonebook.`)
    }
    setSearchQuery('')
  }

  const onNameInputChange = (e) => {
    setNewPerson({ ...newPerson, name: e.target.value })
  }

  const onNumberInputChange = (e) => {
    setNewPerson({ ...newPerson, number: e.target.value })
  }

  const onSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification isErrorMessage={isErrorMessage} message={message} />
      <Filter searchQuery={searchQuery} persons={persons} filterPerson={filterPerson} onClick={searchHandler} onSearchInputChange={onSearchInputChange} />
      <Title text={'Add new number:'} />
      <PersonForm newPerson={newPerson} onClick={addPerson} onNameChange={onNameInputChange} onNumberChange={onNumberInputChange} />
      <Title text={'Numbers'} />
      {persons.map((person) => {
        return <Person key={person.id} onClick={() => removePerson(person)} name={person.name} number={person.number} />
      })}
    </div>
  )
}

export default App