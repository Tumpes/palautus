import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", key: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const Nimi = (person) => {
    console.log(person);
    return <li> {person.name.name} </li>;
  };

  const addName = (event) => {
    event.preventDefault();
    const nimi = {
      name: newName,
      key: newName,
      id: persons.length + 1,
    };
    console.log(persons.concat(nimi));
    setPersons(persons.concat(nimi));
    setNewName('')
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <input value={newName} onChange={handleNameChange} />
        <button type="submit">save</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((name) => 
          <Nimi name={name} />
        )}
      </ul>
    </div>
  );
};

export default App;
