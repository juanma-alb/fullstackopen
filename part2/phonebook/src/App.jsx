import { useState, useEffect} from 'react'
import FindPerson from './components/FindPerson'
import AddNewPersonForm from './components/AddNewPersonForm'
import ShowPersons from './components/ShowPersons'
import axios from "axios"


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [personsToFind,setPersonsToFind ] = useState("")
  
  const personsToShow = personsToFind === ("")
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(personsToFind.toLowerCase())) 
  
  useEffect ( ()=>{
    axios
    .get ("http://localhost:3001/persons")
    .then (response => {
      setPersons(response.data)
    })
  }, [])  

  console.log (`render ${persons.length} persons`)

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