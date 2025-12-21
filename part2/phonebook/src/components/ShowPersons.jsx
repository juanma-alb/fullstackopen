const ShowPersons = ({personsToShow})=> {
  return (<div>
 {
        personsToShow.map(person => (
          <p key={person.id}> <strong>{person.name}</strong>
            <br/> <small>{person.number} </small>
          </p>
        ))
      }

    </div>)
} 

export default ShowPersons