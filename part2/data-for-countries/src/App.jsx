import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'
import CountryData from './components/CountryData'

function App() {

const [allCountries, setAllCountries] = useState ([])
const url = "https://studies.cs.helsinki.fi/restcountries/api/all"

const [allCountriesSearch, setAllCountriesSearch] =useState ("")
const [isLoading, setIsLoading] =useState (true)
const [selectedCountry, setSelectedCountry] = useState (null)

const allCountriesSearchToShow = allCountriesSearch === "" 
? allCountries 
: allCountries.filter (country => country.name.common.toLowerCase().includes (allCountriesSearch.toLowerCase())) 

useEffect( ()=>{
  axios
  .get (url)
  .then (response =>{
    setAllCountries (response.data)
    console.log (response.data)
    setIsLoading(!isLoading)
  })
}, [])

const handleAllCountriesSearch = (event) =>{
  setAllCountriesSearch (event.target.value)
  setSelectedCountry(null)
}

if (isLoading)
  return "loading..."

  return (
   <div>
    <h1>Data for Countries</h1>

    <div>
     find countries <input value={allCountriesSearch} onChange={handleAllCountriesSearch}/>
    </div>

    { selectedCountry ?   
      <CountryData country= {selectedCountry}/>
    
    
    
    :allCountriesSearchToShow.length > 200 ? <p> <br/> Please, search for a country...</p> 

    : allCountriesSearchToShow.length > 10 ? <p> too many results </p > 
    
    : allCountriesSearchToShow.length > 1 ? allCountriesSearchToShow.map (country =>{
      return (
        <div key={country.name.common}>
          <p> {country.name.common} <button onClick={() => {setSelectedCountry (country)}}> show</button></p> 
        </div>
      )
    }) 

    : allCountriesSearchToShow.length === 1 
    ?  allCountriesSearchToShow.map (country => <CountryData country={country} key = {country.name.common}/>)
    
    
    : <p> no results found</p>
    }
    </div>
  )
}

export default App