import React from 'react'

const Country = ({country}) => {
  const [weather, setWeather] = useState([])

  axios.get('http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}', {params})


  //Object.keys(country.languages) is an array 
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
       {Object.keys(country.languages).map((key) => (
            <li key={key}>{country.languages[key]}</li>
          ))
        }              
      </ul> 
      <h2>Flag</h2>
      <img src={country.flags.png} />
    </div>
  )
}

export default Country