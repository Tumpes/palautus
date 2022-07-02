const http = require("http");

require("dotenv").config();

const Person = require("./models/person");

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const { response } = require("express");
const { findByIdAndUpdate } = require("./models/person");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (requset, response) => {
  Person.countDocuments({}).then((count) => {
    if (count) {
      response.json("there are " + count + " numbers in this phonebook.");
    } else {
      response.status(404).end;
    }
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  console.log(request);
  Person.findByIdAndRemove(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end;
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  console.log(request.params.id);

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
