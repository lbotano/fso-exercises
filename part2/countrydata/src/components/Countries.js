import React, { useState } from 'react'
import axios from 'axios'

const Countries = ({ countries, searchingCountry, setSearchingCountry }) => {
    const shownCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchingCountry.toLowerCase())
    )
    let rendered = <div></div>

    const onShowCountry = (country) => {
        setSearchingCountry(country.name)
    }

    if (shownCountries.length === 1) {
        rendered =
            <FullCountryInfo country={shownCountries[0]} />
    }

    if (shownCountries.length > 1) {
        rendered =
            <CountryList shownCountries={shownCountries} onShowCountry={onShowCountry} />
    }

    if (shownCountries.length > 10) {
        rendered =
            <div>Too many matches, specify another filter</div>
    }
    
    return rendered
}

const CountryList = ({ shownCountries, onShowCountry }) =>
    <div>
        {
            shownCountries.map((country) =>
                <div key={country.name}>{country.name} <button onClick={() => onShowCountry(country)}>show</button></div>
            )
        }
    </div>

const FullCountryInfo = ({ country }) => {
    const [ weather, setWeather] = useState({
        current: {
            temp_c: 0,
            condition: {
                text: "",
                icon: ""
            },
            wind_mph: 0,
            wind_dir: ""
        }
    })
    
    console.log(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${country.capital}`)
    axios
        .get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${country.capital}`)
        .then(response => setWeather(response.data))

    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
                {
                    country.languages.map((language) =>
                        <li key={language.iso639_1}>{language.name}</li>
                    )
                }
            </ul>
            <img src={country.flag} height="100" alt={`Flag of ${country.name}`} />
            <h3>Weather in {country.capital}</h3>
            <div>
                <b>temperature:</b> {weather.current.temp_c} Celcius
            </div>
            <img src={weather.current.condition.icon} height="50" alt={weather.current.condition.text} />
            <div>
                <b>wind:</b> {weather.current.wind_mph}mph direction {weather.current.wind_dir}
            </div>
        </div>
    )
}

export default Countries
