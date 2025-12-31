const AddNewPersonForm = ({addPerson, newName, handleNewName, newPhoneNumber, handleNewPhoneNumber}) =>{

  return ( 

    <form onSubmit={addPerson}>
        <div>
          <strong>name:</strong> <input
          value = {newName} 
          onChange={handleNewName}
          placeholder='write the name here'
          />
        </div>
        <div>
          <strong>phone</strong>: <input
          value = {newPhoneNumber} 
          onChange={handleNewPhoneNumber}
          placeholder='write the phone here'
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default AddNewPersonForm