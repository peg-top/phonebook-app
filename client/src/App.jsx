import React from 'react'
import { useState, useEffect } from 'react'
import Filtered from './Filtered'
import AddPerson from './AddPeson'
import ShowPeople from './ShowPeople'
import { getAll, create, update, del } from './network'
import './main.css'

function Notification({ message }) { 
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () =>{

  console.log('App component')

  const [persons, setPersons] = useState([])
  const [newPersonName, setNewPerson] = useState('')
  const [newPersonNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    getAll().then(initialPersons => {
      console.log('promise fulfilled')
      console.log(initialPersons)
      setPersons(initialPersons)
    })
  }, [])

  const handleNameInput = (event) => {
    console.log('New Person Name', event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberInput = (event) => {
    console.log('New Person Number', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    console.log('Filter Name', event.target.value)
    setFilterName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const findedPerson = persons.find(person => person.name === newPersonName)

    console.log('Person', findedPerson)

    if (findedPerson) {

      console.log('Update person')
      console.log('Person ID', findedPerson.id, 'Person Name', findedPerson.name, 'Person Number', findedPerson.number)

      if (window.confirm(`${newPersonName} is already added to phonebook, replace the old number with a new one?`)) {
        
        const updatedPerson = { ...findedPerson, number: newPersonNumber }

        update(findedPerson.id, updatedPerson).then(returnedUpdatedPerson => {
          console.log('Returned Updated Person', returnedUpdatedPerson)
          setPersons(persons.map(person => person.id === findedPerson.id ?  returnedUpdatedPerson : person))
        })

        setErrorMessage(`Updated ${newPersonName}`)

        setNewPerson('')
        setNewNumber('')

      }
      
    } else {

      console.log('Add new peson')

      const newPerson = {
        name: newPersonName,
        number: newPersonNumber || Math.floor(Math.random() * 100000000)
      }

      console.log('New Person', newPerson)
  
      create(newPerson).then(returnedPerson => {
        console.log('Returned Person', returnedPerson)
        setPersons(persons.concat(returnedPerson))
      })

      setErrorMessage(`Added ${newPersonName}`)
      setNewPerson('')
      setNewNumber('')
    }
  }

const deletePerson = (id) => {
  const person = persons.find(person => person.id === id)
  if (window.confirm(`Delete ${person.name} ?`)) {
    del(id).then(response => {
      console.log('Delete Response', response)
      setPersons(persons.filter(person => person.id !== id))
    })
    setErrorMessage(`Deleted ${person.name}`)
  }
}
  
  return (
    <>
      <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
        <Filtered
          filterName={filterName}
          handleFilterInput={handleFilterInput}
        />
      </div>
      <div>
        <h2>Add a new</h2>
        <AddPerson
          newPersonName={newPersonName}
          newPersonNumber={newPersonNumber}
          handleNameInput={handleNameInput}
          handleNumberInput={handleNumberInput}
          addPerson={addPerson}
        />
      </div>
      <div>
        <h2>Numbers</h2>
        <ShowPeople
          persons={persons}
          filterName={filterName}
          deletePerson={deletePerson}
        />
      </div>
    </>
  )
}

export default App
