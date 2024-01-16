import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryInfo from './components/CountryInfo';
import Filter from './components/filter';

const api_key = import.meta.env.VITE_SOME_KEY

function App() {
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);


  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log('Error fetching data: ', error);
      });
  }, []);


  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setNewSearch(searchValue);

    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue)
    );
    setCountries(filtered);
  };

  return (
    <>
      <Filter newSearch={newSearch} onChangeFilter={handleSearchChange} />
      <CountryInfo countries={countries} setCountries={setCountries} />
    </>
  );
}

export default App;
