import { useState, useEffect } from "react"
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
import axios from "axios"

const Message = ({ visualState, message }) => {
  if (visualState !== 'showMessage') {
    return null
  }
  return (
    <p>{message} </p>
  )
}

const Spinner = ({visualState})=>{
  if(visualState !== 'loading'){
    return null
  }
  return(
    <p>Loading...</p>
  )
}

const CountryNames = ({ filteredCountries, visualState, onClick}) => {
  if (visualState !== 'showCountryNames') {
    return null
  }
  return (
    <div>
      {filteredCountries.map((i) => {
        return (
          <div key={i}>
            <p>{i}</p>
            <button onClick={()=>{onClick(i)}}>show</button>
          </div>
        )
      })}
    </div>
  )
}

const CountryInfo = ({ countryInfo, visualState }) => {
  if (visualState !== 'showCountryInfo') {
    return null
  }
  return (
    <div>
      <h2>{countryInfo.name}</h2>
      <p>Capital : {countryInfo.capital}</p>
      <p>Area : {countryInfo.area}</p>
      <ul>Languages:
        {Object.values(countryInfo.languages).map((i) => {
          return <li key={i}>{i}</li>
        })}
      </ul>
      <img width={170} src={countryInfo.flagSrc}></img>
      <p>weather in {countryInfo.name}</p>
      <p>Temperature : {countryInfo.temperature}</p>
      <p>Weather description : {countryInfo.weatherDescription}</p>
      <img width={120} src={countryInfo.weatherIconSrc}></img>
      <p>Wind speed : {countryInfo.windSpeed} m/s</p>
    </div>
  )
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [message, setMessage] = useState(null)
  const [countryInfo, setCountryInfo] = useState({
    name: '', capital: '', area: '', languages: {}, flagSrc: '', temperature: '', weatherIconSrc: '', weatherDescription: '', windSpeed: ''
  })
  const [visualState, setVisualState] = useState('idle') //idle, showCountryNames, showCountryInfo, showMessage, loading

  async function getCountryData(url) {
    try {
      setVisualState('loading')
      const response = await axios.get(url)
      return response.data
    }
    catch (e) {
      setVisualState('showMessage')
      setMessage('Some error occured! please try again.')
    }
  }

  const gettingSingleCountryInfo = async (countryName, capital) => {
    const singleCountryInfo = await getCountryData(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
    const weatherData = await getCountryData(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${countryName}&units=m`)
    const newCountryInfo = {
      name: singleCountryInfo.name.common,
      capital: singleCountryInfo.capital[0],
      area: singleCountryInfo.area,
      languages: singleCountryInfo.languages,
      flagSrc: singleCountryInfo.flags.svg,
      temperature: weatherData.current.temperature,
      weatherIconSrc: weatherData.current.weather_icons[0],
      weatherDescription : weatherData.current.weather_description,
      windSpeed: weatherData.current.wind_speed
    }
    setCountryInfo(newCountryInfo)
    setVisualState('showCountryInfo')
  }
  
  const onInputChange = async (e) => {
    let updatedQuery = e.target.value
    setSearchQuery(updatedQuery)
    let regex = new RegExp(`^${updatedQuery}`, 'i')
    const countryData = await getCountryData(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    const allCounrtyNames = countryData.map((i) => i.name.common)
    const filteredCountryNames = (updatedQuery !== '') ? allCounrtyNames.filter((i) => regex.test(i)) : []

    if (filteredCountryNames.length > 10) {
      setVisualState('showMessage')
      setMessage('Too many countries found, specify another filter.')
    }
    else if (filteredCountryNames.length < 10 && filteredCountryNames.length > 1) {
      setVisualState('showCountryNames')
      setFilteredCountries(filteredCountryNames)
    }
    else if (filteredCountryNames.length === 1) {
      setVisualState('showCountryInfo')
      gettingSingleCountryInfo(filteredCountryNames[0]);
    }
    else if (filteredCountryNames.length === 0) {
      setFilteredCountries(null)
      setVisualState('showMessage')
      setMessage('Not found!')
    }
    updatedQuery === '' && setVisualState('idle')
  }

  return (
    <div>
      find countries <input value={searchQuery} onChange={onInputChange}></input>
      <Spinner visualState={visualState}/>
      <Message visualState={visualState} message={message} />
      <CountryNames visualState={visualState} onClick={gettingSingleCountryInfo} filteredCountries={filteredCountries} />
      <CountryInfo visualState={visualState} countryInfo={countryInfo} />
    </div>
  )
}

export default App;