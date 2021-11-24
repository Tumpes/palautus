import react from "react";
import React, { useState } from "react";
import { useEffect } from "react";
import noteService from "./services/persons";

const Filter = (props) => {
  return (
    <p>
      Filter: <input onChange={props.handleFilterChange} />
    </p>
  );
};

const Nimi = (props) => {
   console.log(props.id);

   const deleteHandler = (id) => {
     if(window.confirm(`delete ${props.name.name}?`))
    noteService.remove(id + 1).then((response) => console.log(response )) // sivulla näkyvät nimet eivät päivity heti

   }

  return (
    <li>
      {props.name.name + " " + props.name.number}
      <button onClick={() => deleteHandler(props.id) }> delete </button>
    </li>
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
      {props.filteredNames.map((name, id) => (
        <props.Nimi name={name} key={name.name} id={id} />
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
    noteService.getAll().then((response) => {
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

      console.log(persons.concat(tiedot));
      noteService.create(tiedot).then((response) => {
        setPersons(persons.concat(response.data));
        setFilteredNames(filteredNames.concat(response.data));
        setNewName("");
      });
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
