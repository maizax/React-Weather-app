import React, { useState } from "react";
import classes from "./index.module.css";
import { BiSearch } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";

interface IData {
  name: string;
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  sys: { country: string };
  weather: { 0: { main: string } };
}

const App = () => {
  const [data, setData] = useState<IData>();
  const [city, setCity] = useState<string>("");

  const getWeather = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=0f915262ffca35ed243d6f6498875bf0`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setCity("");
        });
    }
  };

  const clearInput = () => {
    setCity("");
  };

  return (
    <div className={classes.app}>
      <div className={classes.search}>
        <div className={classes.searchInputs}>
          <input
            placeholder="Enter City name..."
            onChange={(event) => setCity(event.target.value)}
            value={city}
            onKeyPress={getWeather}
            type="text"
          />

          <div className={classes.searchIcon}>
            {city.length > 0 ? <AiFillCloseCircle onClick={clearInput} /> : <BiSearch />}
          </div>
        </div>
      </div>

      <div className={classes.container}>
        <div className={classes.top}>
          <div className={classes.location}>
            {data?.main ? (
              <p>
                Today at {data.name}, {data.sys.country}
              </p>
            ) : null}
          </div>
          {!data?.main && (
            <div className={classes.search}>
              <p>Please enter city name to get weather information</p>
            </div>
          )}
          <div className={classes.temp}>{data?.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}</div>
          <div className={classes.description}>{data?.weather ? <p>{data.weather[0].main}</p> : null}</div>
        </div>

        {data?.name !== undefined && (
          <div className={classes.bottom}>
            <div className={classes.feels}>
              {data.main ? <p className={classes.bold}>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className={classes.humidity}>
              {data.main ? <p className={classes.bold}>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className={classes.wind}>
              {data.wind ? <p className={classes.bold}>{data.wind.speed.toFixed()} KMH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
