import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_SOME_KEY

const Country = ({ country }) => {
  const selectedCountry = country
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let lat = selectedCountry.latlng[0]
    let lon = selectedCountry.latlng[1]

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)

      .then(weatherResponse => {
        setWeather(weatherResponse.data);
        console.log(weatherResponse.data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      })

  }, []); //use effect doesn't have any dependency so it will be called only once after the component rendering



  return (
    <div className='card'>
      <h1>{selectedCountry.name.common}</h1>
      <img className='flag' src={selectedCountry.flags.png} alt="Flag" />
      <p><b>Capital:</b> {selectedCountry.capital}</p>
      <p><b>Population:</b> {selectedCountry.population}</p>
      <p><b>Spoken languages</b></p>
      <ul>
        {Object.values(selectedCountry.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <p><b>Current weather in capital city:</b></p>
            <table className='weatherTable'>
              
              <tbody>
                <tr>
                <td>{weather.weather[0].main}</td>
                  <td>Temperature</td>
                  <td>Humidity</td>
                  
                </tr>
                <tr>
                <td>
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
                  </td>
                  <td>{weather.main.temp} °C</td>
                  <td>{weather.main.humidity} %</td>
                 
                  
                </tr>
              </tbody>
            </table>
        </>
      )}

    </div>
  );
};

export default Country;
