import { useState, useEffect} from 'react'
import FindPerson from './components/FindPerson'
import AddNewPersonForm from './components/AddNewPersonForm'
import ShowPersons from './components/ShowPersons'
import personsService from "./services/persons"

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [personsToFind,setPersonsToFind ] = useState("")
  
  const personsToShow = personsToFind === ("")
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(personsToFind.toLowerCase())) 
  
  useEffect ( ()=>{
    personsService
    .getPersons ()
    .then (response => {
      setPersons(response)
    })
  }, [])  



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
    const personObject = {
      name: newName,
      number: newPhoneNumber
    }
    const personExists = persons.find (person => person.name === newName) 
    //const phoneExist = persons.find (person => person.number === newPhoneNumber) 

    if (personExists) 
     {
      if (window.confirm(`are you sure you want to
         replace the old number with the new one`)){
          personsService
          .updatePerson (personExists.id, personObject)
          .then (response=> {
            setPersons (persons.map (person => person.id === personExists.id ? response : person ))
            setNewName ("")
            setNewPhoneNumber ("")
          })
          .catch(error =>{
            console.error (error)
            alert(`an error occured. 
        reason:
          "${error.message}"`)
          })
         }
    }
    else {
      personsService
      .createPerson(personObject)
      .then(response => {
      setPersons (persons.concat(response))
      setNewName ("")
      setNewPhoneNumber ("")
      })
      .catch (error => {
        console.error (error)
        alert(`an error occured. 
        reason:
          "${error.message}"`)
      })
       }}
       
const deletePerson = (id) =>{
  if (window.confirm ("are you sure you want to delete this person?"))
personsService
.deletePerson (id)
.then (() =>{
  setPersons (persons.filter (person => person.id !== id))
})
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

<ShowPersons personsToShow = {personsToShow} deletePerson={deletePerson}/>

</div>
  )
}

export default App