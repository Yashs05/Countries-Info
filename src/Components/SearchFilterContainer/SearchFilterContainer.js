import React from 'react'
import "./SearchFilterContainer.css"

export default function SearchFilterContainer({ theme, APIData, setAPIData, nonMutableData, setSize, currentRegion, setCurrentRegion, inputValue, setInputValue }) {

    const searchCountry = (e) => {
        if (currentRegion === "All") {
            setAPIData(nonMutableData.filter(
                country => country.name.slice(0, e.target.value.length).toLowerCase() === e.target.value.toLowerCase()
            ))
        }
        else {
            setAPIData(nonMutableData.filter(
                country => country.region === currentRegion
            ).filter(
                country => country.name.slice(0, e.target.value.length).toLowerCase() === e.target.value.toLowerCase()
            ))
        }
        setInputValue(e.target.value)
    }

    const filterCountries = (region) => {
        if (region === "All") {
            setAPIData(nonMutableData)
            setSize(40)
        }
        else {
            setAPIData(nonMutableData.filter(
                country => country.region === region
            ))
            setSize(nonMutableData.length)
        }
        setCurrentRegion(region)
        setInputValue('')
    }

    return (
        <div className={`d-flex justify-content-between filter_container ${theme.currentTheme.searchfilterTheme}`}>
            <div className="input_container">
                <input className="me-2 px-3 py-2" id="input" type="text" placeholder="Search for a country..." value = {inputValue} onChange={searchCountry} disabled={!nonMutableData.length}></input>
            </div>
            <div className="dropdown">
                <button className="btn dropdown-toggle py-2" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" disabled={!nonMutableData.length}>
                    Filtered by&nbsp;&nbsp;:&nbsp;&nbsp;{currentRegion}
                </button>

                <ul className={`${theme.currentTheme.searchfilterTheme === "searchfilter_light" ? "dropdown-menu" : "dropdown-menu dropdown-menu-dark"} my-1`}>
                    <li className="dropdown-item border-bottom border-grey" onClick={() => filterCountries('All')}>All</li>
                    <li className="dropdown-item" onClick={() => filterCountries('Africa')}>Africa</li>
                    <li className="dropdown-item" onClick={() => filterCountries('Americas')}>Americas</li>
                    <li className="dropdown-item" onClick={() => filterCountries('Asia')}>Asia</li>
                    <li className="dropdown-item" onClick={() => filterCountries('Europe')}>Europe</li>
                    <li className="dropdown-item" onClick={() => filterCountries('Oceania')}>Ocenia</li>
                </ul>
            </div>
        </div>
    )
}
