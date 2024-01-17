import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  //const [loading, setLoading] = useState(true);

  console.log(country)
  useEffect(() => {
    const apiKey = '836a30f7ac09f6f85c4d73311ccd5626';
    const lat = country.latlng[0]
    const lon = country.latlng[1]
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
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt="Flag" />
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <h2>Current weather</h2>
      
      
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Description: {weather.weather[0].description}</p>
      
      
    </div>
  );
};

export default Country;
