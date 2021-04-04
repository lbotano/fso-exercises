import React from 'react'

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

const FullCountryInfo = ({ country }) =>
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
        <img src={country.flag} height="100" alt={`Flag of ${country.name}`}/>
    </div>

export default Countries
