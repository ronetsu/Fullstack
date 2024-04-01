require('dotenv').config()

let PORT = 3001
let MONGODB_URI = "mongodb+srv://ronjalipsonen:Ukkoliini12@cluster0.km2kn07.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

module.exports = {
  MONGODB_URI,
  PORT
}