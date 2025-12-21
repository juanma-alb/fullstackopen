const FindPerson = ({personsToFind, handlePersonsToFind}) =>{

  return(   
  <div>
   <input type='text' value= {personsToFind} onChange={handlePersonsToFind}/>
      </div>)
}

export default FindPerson