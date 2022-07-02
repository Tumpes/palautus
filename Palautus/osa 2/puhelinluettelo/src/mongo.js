const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Usage: node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://Tumpes:${password}@cluster0.dxkr9.mongodb.net/Person?retryWrites=true&w=majority`;
mongoose.connect(url);

const schema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model("Person", schema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    number: number,
    date: new Date(),
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
