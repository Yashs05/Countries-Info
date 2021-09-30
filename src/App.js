import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Countries from './Components/Countries/Countries';
import Country from './Components/Country/Country';
import Header from './Components/Header/Header';
import SearchFilterContainer from './Components/SearchFilterContainer/SearchFilterContainer';

function App() {

  const [APIData, setAPIData] = useState([])

  const [nonMutableData, setNonMutableData] = useState([])

  const [size, setSize] = useState(40)

  const [isLoading, setIsLoading] = useState(true)

  const [currentRegion, setCurrentRegion] = useState('All')

  const [inputValue, setInputValue] = useState('')

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === null ?
    {
      currentTheme:
      {
        navbarTheme: 'navbar_light',
        searchfilterTheme: 'searchfilter_light',
        countriesTheme: 'countries_light',
        countryTheme: 'country_light',
        bodyContainerTheme: 'body_container_light',
        placeHolderTheme: 'placeholder_light'
      },
      imageClassName: 'fa fa-moon-o',
      imagetText: null,
      nextMode: "Dark Mode"
    } :
    JSON.parse(localStorage.getItem('theme'))
  )
  
  const changeTheme = () => {
    if(isLoading) {

    }
    
    else if (theme.currentTheme.navbarTheme === 'navbar_light') {
      setTheme(
        {
          currentTheme: {
            navbarTheme: 'navbar_dark',
            searchfilterTheme: 'searchfilter_dark',
            countriesTheme: 'countries_dark',
            countryTheme: 'country_dark',
            bodyContainerTheme: 'body_container_dark',
            placeHolderTheme: 'placeholder_dark'
          },
          imageClassName: 'material-icons',
          imagetText: 'wb_sunny',
          nextMode: 'Light Mode',
        }
        )
      }
    else {
      setTheme(
        {
          currentTheme:
          {
            navbarTheme: 'navbar_light',
            searchfilterTheme: 'searchfilter_light',
            countriesTheme: 'countries_light',
            countryTheme: 'country_light',
            bodyContainerTheme: 'body_container_light',
            placeHolderTheme: 'placeholder_light'
          },
          imageClassName: 'fa fa-moon-o',
          imagetText: null,
          nextMode: "Dark Mode"
        }
      )
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])


  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(response => response.json())
      .then(data => { setAPIData(data); setNonMutableData(data) })
      .then(loading => setIsLoading(false))
      .catch(error => setTimeout(() => setIsLoading(false), 5000))
  }, [])

  if (isLoading) {
    document.querySelector('body').style.overflowY = 'hidden'
    document.querySelector('body').style.opacity = '0.7'
  }
  else {
    document.querySelector('body').style.overflowY = 'auto'
    document.querySelector('body').style.opacity = '7'
  }

  return (

    <Router>

      <Switch>

        <Route exact path="/">
          <div className={`body_container ${theme.currentTheme.bodyContainerTheme}`}>
            <Header theme={theme} setTheme={setTheme} changeTheme={changeTheme} />
            <SearchFilterContainer theme={theme} APIData={APIData} setAPIData={setAPIData} nonMutableData={nonMutableData} setSize={setSize} currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} inputValue = {inputValue} setInputValue = {setInputValue}/>
            <Countries theme={theme} APIData={APIData} nonMutableData={nonMutableData} isLoading={isLoading} size={size} setSize={setSize} currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} inputValue = {inputValue}/>
          </div>
        </Route>

        {nonMutableData.map(country =>
          <Route exact path={`/${country.alpha3Code}`} key={country.alpha3Code}>
            <div className={`body_container ${theme.currentTheme.bodyContainerTheme}`}>
              <Header theme={theme} setTheme={setTheme} changeTheme={changeTheme} />
              <Country country={country} theme={theme} />
            </div>
          </Route>
        )
        }

      </Switch>
    </Router >
  );

}

export default App;
