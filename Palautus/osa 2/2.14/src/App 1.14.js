import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = (props) => {
  const [weather, setWeather] = useState({});
  const matches = props.matches;
  console.log(matches.length);
  console.log(matches);

  const temp = matches[0] ? matches[0] : matches;
  const country = temp.name ? temp.name.common : temp;

  console.log(country);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${props.api_key}&query=${country}`
      )
      .then((response) => {
        setWeather(response);
      });
  }, [country, props.api_key]);

  if (matches.length === 0) return <p> Ei hakutuloksia. </p>;
  else if (matches.length >= 10) return <p> Tarkenna hakua. </p>;
  else if (matches.length === 1 || matches.length === undefined) {
    const country = matches[0] ? matches[0] : matches;
    console.log(country.name.common);

    return (
      <>
        <h1> {country.name.common} </h1>
        <p>capital {country.capital}</p>
        <p> continent {country.continents} </p>
        <h3> languages </h3>
        {Object.values(country.languages).map((language) => {
          return <p key={language}> {language} </p>;
        })}
        <img src={country.flags.png} alt="maan lippu" />
        <p> temperature: {weather.data.current.temperature}</p>
        <img
          src={weather.data.current.weather_icons[0]}
          alt="kuva säästä"
        ></img>
        <p>
          wind: {weather.data.current.wind_speed}mph direction
          {weather.data.current.wind_degree}
        </p>
      </>
    );
  } else {
    console.log(matches);
    return matches.map((country) => {
      return (
        <p key={country.name.common}>
          {country.name.common}
          <button
            onClick={() => {
              props.setMatches(country);
            }}
          >
            show
          </button>
        </p>
      );
    });
  }
};

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);

  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);
  const [countries, setCountries] = useState([]);

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    console.log(countries);
    setMatches(
      countries.filter((e) =>
        e.name.common.toLowerCase().includes(event.target.value)
      )
    );
    console.log(countries.filter((e) => e.name.common === event.target.value));
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      find countries
      <input onChange={handleSearchChange} value={search}></input>
      <Countries
        matches={matches}
        setMatches={setMatches}
        api_key={api_key}
      ></Countries>
    </div>
  );
};

export default App;
