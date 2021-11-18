import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-00000", key: "Arto Hellas", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((name) => (
          <Nimi name={name} key={name.name} />
        ))}
      </ul>
    </div>
  );
};

export default App;
