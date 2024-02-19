const express = require("express");
const app = express();

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
  {
    id: "1178",
    name: "Mau",
    number: "111",
  },
];

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
