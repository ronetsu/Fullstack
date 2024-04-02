const blogsRouter = require("../controllers/blogs.js")

const dummy = (blogsRouter) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

module.exports = {
  dummy, totalLikes
}