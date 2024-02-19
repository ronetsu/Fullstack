import countryService from './services/countries'
import { useState, useEffect } from 'react'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [subString, setSubString] = useState('')

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries])

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    const searchString = event.target.value;
    setSubString(searchString);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchString.toLowerCase()))
    setFilteredCountries(filtered);
  }

  return (
    <>
      <form>
         <div>
            find countries <input value={subString}
            onChange={handleFilterChange}/>
         </div>
      </form>
      <div>
        {name.common}
      </div>
    </>
  )
}

export default App
