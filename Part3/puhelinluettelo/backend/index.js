const express = require("express");
const morgan = require("morgan");
const app = express();

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
console.log("MongoDB URI:", process.env.MONGODB_URI);
const Person = require("./models/person");

app.use(express.static("dist"));
const cors = require("cors");

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if(error.name === "CastError") {
    return response.status(400).send({error: "malformatted id"});
  }

  next(error);
}

app.use(cors());
app.use(express.json());

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
  .then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end(); 
    }
  }).catch(error => next(error))
  console.log(person.id, typeof person.id, id, typeof id, person.id === id);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  Person.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      return response.status(400).json({
        error: "name already in phonebook",
      });
    } else {
      const newPerson = new Person({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000),
      });
      newPerson.save().then((savedPerson) => {
        response.json(savedPerson);
      });
    }
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
        response.status(204).end();
    })
    .catch(error => next(error));
});

app.get("/info", (request, response) => {
  response.send(
    "<p>Phonebook has info for " + persons.length + " people</p>" + new Date()
  );
});

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
