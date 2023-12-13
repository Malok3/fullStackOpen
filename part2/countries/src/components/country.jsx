import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
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