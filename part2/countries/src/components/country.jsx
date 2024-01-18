import React, { useState, useEffect } from 'react';
import axios from 'axios';



//const [loading, setLoading] = useState(true);

const apiKey = import.meta.env.VITE_SOME_KEY

const Country = ({ country }) => {
  const selectedCountry = props.country
  const [weather, setWeather] = useState({});
  //const [loading, setLoading] = useState(true);

  console.log(country)
  useEffect(() => {

    const lat = selectedCountry.latlng[0]
    const lon = selectedCountry.latlng[1]
   
    // get coordinates from country's capital
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    
      .then(weatherResponse => {
        setWeather(weatherResponse.data);
        console.log(weatherResponse)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      
  }); // Ajout de country.capital comme dépendance pour useEffect

      

  return (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      <img src={selectedCountry.flags.png} alt="Flag" />
      <p>Capital: {selectedCountry.capital}</p>
      <p>Population: {selectedCountry.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {Object.values(selectedCountry.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <h2>Current weather</h2>
      
{/*       
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Description: {weather.weather[0].description}</p>
       */}
      
    </div>
  );
};

export default Country;
