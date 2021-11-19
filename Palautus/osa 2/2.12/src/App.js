import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState("");
  const [countries, setCountries] = useState("");

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    setMatches(countries.filter((e) =>  e.name.common === event.target.value));
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
      <p> {matches} </p>
    </div>
  );
};

export default App;
