import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

function App() {
    const [searchingCountry, setSearchingCountry] = useState("")
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    return (
        <div>
            <div>
                find countries <input value={searchingCountry} onChange={(event) => setSearchingCountry(event.target.value)} />
            </div>
            <Countries countries={countries} searchingCountry={searchingCountry} setSearchingCountry={setSearchingCountry} />
        </div>
    );
}

export default App;
