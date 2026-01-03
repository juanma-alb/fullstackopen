import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {

  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    if (capital) {
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}&aqi=no`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [capital]) 


  if (!weather) return <p>Loading weather...</p>

  return (
    <div>
      <h3>Weather in {capital}</h3>

      <p><strong>Temperature</strong> {weather.current.temp_c} Celsius</p>
      
      <img 
        src={`https:${weather.current.condition.icon}`} 
        alt={weather.current.condition.text} 
        width="100"/>
      
      <p><strong>wind:</strong> {weather.current.wind_kph} km/h</p>
    </div>
  )}

export default Weather