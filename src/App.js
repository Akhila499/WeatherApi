import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [apiData, setApiData] = useState({});
  const [getCity, setGetCity] = useState('toronto');
  const [state, setState] = useState('toronto');

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`
  const fetchData = async (url) => {
    let res = await fetch(url);
    let data = await res.json();
    setApiData(data);
  }
  useEffect(() => {
    fetchData(url);
    console.log('data', apiData);
      
  }, [url])

  const inputTyped = (event) => {
    setGetCity(event.target.value)
  }
  const submitRequest = () => {
    setState(getCity)
  }
  const convertKelToFar = (k) => {
    return (k - 273.15).toFixed(2);
  };
  

  return (
    <div className='App'>
      <div className='Input-Class'>
        <h4>React Weather App</h4>
          <label htmlFor="city">
            Enter City:
          </label> {' '}
          <input type="text" id="city" onChange={inputTyped} value={getCity} />
          <button onClick={submitRequest}>
            Search
          </button>
      </div>
      <div>
        {apiData.main ? (
          <div>
            <img
              src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather icon"
            />
            <p>Current Temp: {convertKelToFar(apiData.main.temp)}</p>
          <p>City: {apiData.name}</p>
          <p>Min Temp: {convertKelToFar(apiData.main.temp_min)}</p>
          <p>Max Temp: {convertKelToFar(apiData.main.temp_max)}</p>
          <p>Country: {apiData.sys.country}</p>
          </div>
        ) : (<h6>Enter correct city </h6>)}
      </div>
    </div>
  );
}

export default App;
