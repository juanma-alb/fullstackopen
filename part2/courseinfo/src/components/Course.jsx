
const Header = ({name}) => {
  //console.log ("prop Header:", name)
return (<h2> {name}</h2>
)}


const Part = ({part}) =>{
    //console.log ("prop Part:", part)

  return (
    <li> {part.name} {part.exercises} </li>
  )}

  
const Content = ({parts}) => {
    //console.log ("prop Content:", parts)

return (
  <ul>{parts.map (part => 
      <Part key ={part.id} part= {part} />
  )}</ul>
  
)}

const Course = ({course}) =>{
    //console.log ("prop Course:", course)

  return (
<div>
  < Header name= {course.name}/>
  <Content parts = {course.parts}/>
  <Total parts = {course.parts}/>
  </div>
  )}

const Total= ({parts}) => {
    //console.log ("prop total:", parts)

  const totalExercises = parts.reduce ((suma, part ) =>{
 return suma + part.exercises }, 0
)
return(
  <p> Total of <strong>{totalExercises} </strong> exercises </p> 
)
}

export default Course