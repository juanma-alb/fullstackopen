import { useState } from 'react'

const Button = ({click, tipo})=>{
return (
<button onClick= {click}> {tipo} </button>
)}

const StatisticLine = ({ text, counter }) => {
  return (
  <tr>
  <td>{text}</td>
  <td>{counter}</td>
  </tr>
)}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  
  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / all
  const positiveRating = (good / all) * 100

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" counter={good} />
          <StatisticLine text="neutral" counter={neutral} />
          <StatisticLine text="bad" counter={bad} />
          <StatisticLine text="all" counter={all} />
          <StatisticLine text="average" counter={average.toFixed(2)} />
          <StatisticLine text="positive" counter={positiveRating.toFixed(2) + " %"} />
        </tbody>
      </table>
    </div>
  )}

const App = () => {
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)

const voteGood = () =>{
setGood(good +1)
console.log(good)
}
const voteNeutral= () =>{
setNeutral(neutral +1)
console.log(neutral)
}

const voteBad= () =>{
setBad(bad +1)
console.log(bad)
}

  return (
    <div>
<h1>give feedback</h1>
<Button click= {voteGood} tipo= {"good"}/> 
<Button click= {voteNeutral}  tipo= {"neutral"}/> 
<Button click= {voteBad}  tipo= {"bad"}/>

<Statistics good= {good} neutral= {neutral} bad={bad}/>

    </div>
)}

export default App