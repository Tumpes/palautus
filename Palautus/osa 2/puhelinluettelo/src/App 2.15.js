import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <p>
      Filter: <input onChange={props.handleFilterChange} />
    </p>
  );
};

const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number:
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button type="submit">save</button>
    </form>
  );
};

const Persons = (props) => {
  if (props.filteredNames === undefined) return null;
  return (
    <ul>
      {props.filteredNames.map((name) => (
        <props.Nimi name={name} key={name.name} />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState(persons);

  useEffect(() => {
    console.log(axios.get("http://localhost:3001/persons"));
    axios.get("http://localhost:3001/persons").then((response) => {
      setFilteredNames(response.data);
      setPersons(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    console.log(filter);
    if (filter === null || filter === "") {
      setFilteredNames(persons);
    } else {
      setFilteredNames(
        persons.filter((e) => e.name.toLowerCase().includes(filter))
      );
      console.log(filteredNames);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const Nimi = (person) => {
    console.log(person);
    return <li> {person.name.name + " " + person.name.number} </li>;
  };

  const addName = (event) => {
    event.preventDefault();
    if (persons.filter((e) => e.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook.`);
    } else {
      const tiedot = {
        name: newName,
        number: newNumber,
        key: newName,
        id: persons.length + 1,
      };
      axios.post("http://localhost:3001/persons", tiedot).then ((response) => {console.log(response)});
      console.log(persons.concat(tiedot));
      setPersons(persons.concat(tiedot));
      setFilteredNames(filteredNames.concat(tiedot));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h1> add new person </h1>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredNames={filteredNames} Nimi={Nimi} />
    </div>
  );
};

export default App;
