import Weather from "./Weather"

const CountryData = ({country}) =>{

    return (
        <div key = {country.name.common}>
          <h1> {country.name.common}</h1>
          <p> <strong>Capital: </strong>{country.capital}</p>
          <p> <strong>Area:</strong> {country.area}</p>
          <p> <strong>Languages:</strong></p>
          
          <ul > {Object.values(country.languages).map (language =>{

            return( 
            <li key= {language}> {language}</li>)
          })}</ul>
          <img src= {country.flags.svg} width="300"/>
          <Weather capital={country.capital} />

        </div>
      )
}

export default CountryData