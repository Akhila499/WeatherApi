import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [apiData, setApiData] = useState({});
  const [getCity, setGetCity] = useState('toronto');
  const [state, setState] = useState('toronto');

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data))
  }, [url])

  const inputTyped = (event) => {
    setGetCity(event.target.value)
  }
  const submitRequest = () => {
    setState(getCity)
  }
  

  return (
    <>
      <div>
        <h4>React Weather App</h4>
        <div>
          <label for="city">
            Enter City:
          </label>
        </div>
        <div>
          <input type="text" id="city" onChange={inputTyped} value={getCity} />
        </div>
        <button onClick={submitRequest}>
          Search
        </button>
      </div>
      <div>
        {apiData.main ? (
          <div>
            <p>{apiData.main.temp}</p>
          <p>{apiData.name}</p>
          <p>{apiData.main.temp_min}</p>
          <p>{apiData.main.temp_max}</p>
          <p>{apiData.weather[0].main}</p>
          {/* <p>{countries.getName(apiData.sys.country, 'en', {
            select: 'official',
          })}</p> */}
          </div>
        ) : (<h1>Loading</h1>)}
      </div>
    </>
  );
}

export default App;
