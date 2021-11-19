import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState(persons);

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    console.log(filter);
    if (filter === null || filter === "") {
      setFilteredNames(persons);
    } else {
      setFilteredNames(persons.filter((e) => e.name.toLowerCase().includes(filter)));
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
      console.log(persons.concat(tiedot));
      setPersons(persons.concat(tiedot));
      setFilteredNames(filteredNames.concat(tiedot))
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      Filter: <input onChange={handleFilterChange} />
      <h1> add new person </h1>
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
      <h2>Numbers</h2>
      <ul>
        {filteredNames.map((name) => (
          <Nimi name={name} key={name.name} />
        ))}
      </ul>
    </div>
  );
};

export default App;
