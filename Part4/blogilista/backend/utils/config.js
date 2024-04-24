const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") })

let PORT = process.env.PORT
console.log("PORT:", PORT)

const MONGODB_URI = process.env.NODE_ENV === "test"
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
console.log("MONGODB_URI:", MONGODB_URI)

module.exports = {
  MONGODB_URI,
  PORT
}