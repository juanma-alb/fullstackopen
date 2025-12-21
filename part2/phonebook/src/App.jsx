import { useState } from 'react'
import FindPerson from './components/FindPerson'
import AddNewPersonForm from './components/AddNewPersonForm'
import ShowPersons from './components/ShowPersons'



const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [personsToFind,setPersonsToFind ] = useState("")
  
  const personsToShow = personsToFind === ("")
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(personsToFind.toLowerCase())) 
  
    const handlePersonsToFind = (event) =>{
  setPersonsToFind(event.target.value)
  console.log(event.target.value)}

  const handleNewName = (event) =>{
  setNewName(event.target.value)
  console.log(event.target.value)}

  const handleNewPhoneNumber = (event) =>{
  setNewPhoneNumber(event.target.value)
  console.log(event.target.value)}


  const addPerson = (event) =>{
  event.preventDefault()
    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newPhoneNumber
    }
    const nameExist = persons.find (person => person.name === newName) 
    const phoneExist = persons.find (person => person.number === newPhoneNumber) 

    if (nameExist) 
    alert(`${newName} already exists`)
    else if (phoneExist) {alert (`the phone number ${newPhoneNumber} already exists`)}
    else {setPersons (persons.concat(nameObject)) }
    setNewName ("")
    setNewPhoneNumber ("")
  } 

return (
<div>
      <h2>Phonebook</h2>

<FindPerson 
personsToFind={personsToFind} 
handlePersonsToFind = {handlePersonsToFind}/>

<br/>

<AddNewPersonForm 
addPerson={addPerson} 
newName={newName} 
handleNewName={handleNewName} 
newPhoneNumber={newPhoneNumber} 
handleNewPhoneNumber={handleNewPhoneNumber} />

<h2>Numbers</h2>

<ShowPersons personsToShow = {personsToShow}/>

</div>
  )
}

export default App