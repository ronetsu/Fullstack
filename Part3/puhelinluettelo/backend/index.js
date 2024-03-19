const express = require("express");
const morgan = require("morgan");
const app = express();

const path = require("path");
console.log("Resolved path to .env file:", path.resolve(__dirname, "../.env"));
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
console.log("MongoDB URI:", process.env.MONGODB_URI);
const Person = require("./models/person");

app.use(express.static("dist"));
const cors = require("cors");

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(cors());
app.use(express.json());

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
  console.log(person.id, typeof person.id, id, typeof id, person.id === id);
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => {
      console.error("Error removing person:", error);
      response.status(500).json({ error: "Internal Server Error" });
    });
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

app.get("/info", (request, response) => {
  response.send(
    "<p>Phonebook has info for " + persons.length + " people</p>" + new Date()
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
