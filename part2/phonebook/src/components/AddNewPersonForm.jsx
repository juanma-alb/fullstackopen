const AddNewPersonForm = ({addPerson, newName, handleNewName, newPhoneNumber, handleNewPhoneNumber}) =>{

  return ( 

    <form onSubmit={addPerson}>
        <div>
          name: <input
          value = {newName} 
          onChange={handleNewName}
          placeholder='write your note here'
          />
        </div>
        <div>
          phone: <input
          value = {newPhoneNumber} 
          onChange={handleNewPhoneNumber}
          placeholder='write your phone here'
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default AddNewPersonForm