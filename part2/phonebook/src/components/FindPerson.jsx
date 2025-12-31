const FindPerson = ({personsToFind, handlePersonsToFind}) =>{

  return(   
  <div> <strong>filter</strong> shown with: 
   <input type='text' value= {personsToFind} onChange={handlePersonsToFind}/>
      </div>)
}

export default FindPerson