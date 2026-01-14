import { useState, useEffect} from 'react'
import FindPerson from './components/FindPerson'
import AddNewPersonForm from './components/AddNewPersonForm'
import ShowPersons from './components/ShowPersons'
import personsService from "./services/persons"
import Notification from './components/Notification'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [personsToFind,setPersonsToFind ] = useState("")
  const [successMessage, setSuccessMessage] = useState("") 
  const [errorMessage, setErrorMessage] = useState("")
  
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

//handlers
  const handlePersonsToFind = (event) =>{
  setPersonsToFind(event.target.value)
  }  
  const handleNewName = (event) =>{
  setNewName(event.target.value)
  }  
  const handleNewPhoneNumber = (event) =>{
  setNewPhoneNumber(event.target.value)
  }  

//add/replace person
  const addPerson = (event) =>{
  event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhoneNumber
    }
    const personExists = persons.find (person => person.name === newName) 
    //const phoneExist = persons.find (person => person.number === newPhoneNumber) 

    //replace 
    if (personExists) 
     {
      if (window.confirm(`are you sure you want to replace the old number of ${newName} with the new one`)){
          personsService
          .updatePerson (personExists.id, personObject)
          .then (response=> {
            setPersons (persons.map (person => person.id === personExists.id ? response : person ))
            setNewName ("")
            setNewPhoneNumber ("")
            setSuccessMessage(`${newName} replaced successfully`)
            setTimeout(() => setSuccessMessage(null), 3500)
          })
          .catch(error =>{
            if (error.response && error.response.data.error ){
            setErrorMessage (`error updating ${newName}, reason: ${error.response.data.error}`)
            }
            else
            {console.error (error)
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(()=> setErrorMessage(""), 7000)
            setPersons(persons.filter(person => person.id !== personExists.id))}


          })
         }
    }
    //create 
    else {
      personsService
      .createPerson(personObject)
      .then(response => {
      setPersons (persons.concat(response))
      setNewName ("")
      setNewPhoneNumber ("")
      setSuccessMessage(`${newName} created successfully`)
      setTimeout(()=> setSuccessMessage(""), 3500)

      })
      .catch(error =>{
            console.error (error)
            setErrorMessage (`error creating ${newName}, reason: ${error.response.data.error}`)
            setTimeout(()=> setErrorMessage(""), 7000)
          })
       }}

//delete       
const deletePerson = (id) =>{
  const personDeleted = persons.find (person => person.id === id)
  if (window.confirm (`are you sure you want to delete ${personDeleted.name} from phonebook?`)){
  
personsService
.deletePerson (id)
.then (() =>{
  setPersons (persons.filter (person => person.id !== id))
  setSuccessMessage(`${personDeleted.name} deleted successfully`)
  setTimeout(()=> setSuccessMessage(""), 3500)
})
  .catch(error =>{
            console.error (error)
            setErrorMessage (`error deleting ${personDeleted.name}, reason ${error.message}`)
            setTimeout(()=> setErrorMessage(""), 7000)
            setPersons(persons.filter(person => person.id !== id))

          })

}
}
return (
<div>
      <h2>Phonebook</h2>
<Notification message={successMessage} type={"success"}/>
<Notification message={errorMessage} type={"error"}/>

<FindPerson 
personsToFind={personsToFind} 
handlePersonsToFind = {handlePersonsToFind}/>

<br/>
<h3>Add a new person</h3>
<AddNewPersonForm 
addPerson={addPerson} 
newName={newName} 
handleNewName={handleNewName} 
newPhoneNumber={newPhoneNumber} 
handleNewPhoneNumber={handleNewPhoneNumber} />
<br/>



<h2>Numbers</h2>

<ShowPersons personsToShow = {personsToShow} deletePerson={deletePerson}/>

</div>
  )
}

export default App