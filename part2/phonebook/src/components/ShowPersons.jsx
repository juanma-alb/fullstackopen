const ShowPersons = ({personsToShow, deletePerson})=> {
  return (<div>
 {
        personsToShow.map(person => (
          <p key={person.id}> <strong>{person.name}</strong>
            <br/> <small>{person.number} </small> <button onClick={() =>deletePerson(person.id)}> delete</button>
          </p>
        ))
      }

    </div>)
} 

export default ShowPersons