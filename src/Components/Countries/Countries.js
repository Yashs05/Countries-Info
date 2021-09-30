import React from 'react'
import { Link } from 'react-router-dom'
import CardPlaceholder from '../CardPlaceholder/CardPlaceholder'
import "./countries.css"

export default function Countries({ APIData, theme, isLoading, size, setSize, currentRegion, nonMutableData, inputValue }) {

    let alignment = size === 40 ? 'end' : 'between'

    const handleShowMore = () => {
        setSize(prev => prev + 40)
    }

    const handleHideLess = () => {
        setSize(prev => prev - 40)
    }

    const handleShowAll = () => {
        setSize(APIData.length)
    }

    const handleHideAll = () => {
        setSize(40)
    }

    return (
        <React.Fragment>

            {isLoading ?
                <CardPlaceholder theme = {theme} /> :
                nonMutableData.length === 0 ?
                    <div className = 'text-center d-flex flex-column' style = {{color: theme.currentTheme.navbarTheme === "navbar_light" ? 'hsl(200, 15%, 8%)' : 'hsl(0, 0%, 98%)'}}>
                        <span>Unable to load. Make sure you are connected to a network or try again after some time as there might be a problem in getting the data.</span>
                        <span className = "my-3">Made by <a href = "https://linkedin.com/in/yash-sharma-40534020a" target = "_blank" rel="noreferrer" className = "text-decoration-underline">Yash Sharma</a>.&nbsp;&nbsp;Challenge by <a href = "https://www.frontendmentor.io/" target = "_blank" rel="noreferrer" className = "text-decoration-underline">Frontend Mentor</a>
                        </span>
                        </div> :
                    <>
                        <div className={`countries_cards_container ${theme.currentTheme.navbarTheme === "navbar_light" ? 'countries_light' : 'countries_dark'}`}>
                            <div className="row px-0 cards_row">
                                {APIData.slice(0, size).map((country) => {
                                    return (
                                        <div className="card country_card col-sm-4" key={country.name}>
                                            <Link to={`/${country.alpha3Code}`}>
                                                <img src={country.flags.svg} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title">{country.name}</h5>

                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">
                                                            <span className="details" >Population: </span>
                                                            <span>{country.population}</span>
                                                        </li>

                                                        <li className="list-group-item">
                                                            <span className="details" >Region: </span>
                                                            <span>{country.region}</span>
                                                        </li>

                                                        <li className="list-group-item">
                                                            <span className="details" >Capital: </span>
                                                            <span>{country.capital ? country.capital : 'Unknown'}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className={`d-flex justify-content-${alignment} fw-bold show_hide_container`} style={{ padding: '1.5rem 5%' }}>
                            {size > 40 && currentRegion === "All" && inputValue === "" ?
                                <div className="d-flex">
                                    <div onClick={handleHideLess} className="show_hide_containers hide_less" style={{ cursor: 'pointer' }}>
                                        <i className="material-icons">keyboard_arrow_up</i>Hide less
                                    </div>

                                    <div onClick={handleHideAll} className="show_hide_containers mx-3" style={{ cursor: 'pointer' }}>
                                        Hide all<i className="material-icons">keyboard_arrow_up</i>
                                    </div>
                                </div> : null
                            }

                            {size < APIData.length && currentRegion === "All" && inputValue === "" ?
                                <div className="d-flex">
                                    <div onClick={handleShowAll} className="show_hide_containers mx-3" style={{ cursor: 'pointer' }}>
                                        Show all<i className="material-icons">keyboard_arrow_down</i>
                                    </div>

                                    <div onClick={handleShowMore} className="show_hide_containers show_more" style={{ cursor: 'pointer' }}>
                                        Show more<i className="material-icons">keyboard_arrow_down</i>
                                    </div>
                                </div> : null
                            }
                        </div>
                    </>
            }

        </React.Fragment>
    )
}
