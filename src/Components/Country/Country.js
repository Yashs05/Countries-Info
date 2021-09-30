import React from 'react'
import { Link } from 'react-router-dom'
import './country.css'

export default function Country({ country, theme }) {
    return (
        <div className={`${theme.currentTheme.countryTheme} component_container`}>
            <button type="button" className="btn py-0 back_button">
                <Link to="/" className="d-flex align-items-center py-2 home_link">
                    <i className="material-icons me-1">keyboard_backspace</i>
                    Back to home
                </Link>
            </button>

            <div className={`d-flex country_container`}>
                <div className="image_container h-100">
                    <img src={country.flags.svg} className="w-100 h-100" alt="" />
                </div>
                <div className="d-flex flex-column country_details_container">

                    <h2 className="h2 fw-bold mb-3">{country.name}</h2>
                    <div className="d-flex row">
                        <div className="d-flex col-sm-6 px-0 mt-2">
                            <span className="details_heading">
                                Native Name: <span className="pe-2 fw-light">{country.nativeName}</span>
                            </span>
                        </div>

                        <div className="d-flex col-sm-6 px-0 mt-2">
                            <span className="details_heading">
                                Population: <span className="pe-2 fw-light">{country.population}</span>
                            </span>
                        </div>

                        <div className="d-flex col-sm-6 px-0 mt-2">
                            <span className="details_heading">
                                Region: <span className="pe-2 fw-light">{country.region}</span>
                            </span>
                        </div>

                        <div className="d-flex col-sm-6 px-0 mt-2">
                            <span className="details_heading">
                                Sub Region: <span className="pe-2 fw-light">{country.subregion}</span>
                            </span>
                        </div>

                        <div className="d-flex col-sm-6 px-0 mt-2">
                            <span className="details_heading">
                                Capital: <span className="pe-2 fw-light">{country.capital ? country.capital : 'Unknown'}</span>
                            </span>
                        </div>

                        <div className="d-flex col-sm-6 px-0 mt-2">
                            <span className="details_heading">
                                Top Level Domain: <span className="pe-2 fw-light">{country.topLevelDomain}</span>
                            </span>
                        </div>

                        <div className="d-flex col-sm-6 px-0 mt-2">
                            <span className="details_heading">
                                Currencies: <span className="pe-2 fw-light">
                                    {country.hasOwnProperty('currencies') ? country.currencies.map(currency =>
                                        currency.name + (currency === country.currencies[country.currencies.length - 1] ? "" : ", ")
                                    ) : 'No currency'}
                                </span>
                            </span>
                        </div>

                        <div className="d-flex col-sm-6 px-0 mt-2">
                            <span className="details_heading">
                                Languages: <span className="pe-2 fw-light">
                                    {country.languages.map(language =>
                                        language.name + (language === country.languages[country.languages.length - 1] ? "" : ", ")
                                    )}
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="d-flex borders_container">
                        <div className="d-flex flex-wrap align-items-center">
                            <div className="me-1 border_countries">Border Countries :</div>
                            {country.hasOwnProperty('borders') ? country.borders.map(border =>
                                <Link to={`/${border}`} className="countries_links">
                                    <div className="py-1 px-3 countries" key={border}>
                                        {border}
                                    </div>
                                </Link>
                            ) : 'No border countries'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
