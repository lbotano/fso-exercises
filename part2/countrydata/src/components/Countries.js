import React from 'react'

const Countries = ({ countries, searchingCountry }) => {
    const shownCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchingCountry.toLowerCase())
    )

    if (shownCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    
    if (shownCountries.length > 1) {
        return (
            <CountryList shownCountries={shownCountries} />
        )
    }

    if (shownCountries.length === 1) {
        return (
            <FullCountryInfo country={shownCountries[0]} />
        )
    }

    return (<div></div>)
}

const CountryList = ({ shownCountries }) =>
    <div>
        {
            shownCountries.map((country) =>
                <div>{country.name}</div>
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
                    <li>{language.name}</li>
                )
            }
        </ul>
        <img src={country.flag} height="100" />
    </div>


export default Countries
