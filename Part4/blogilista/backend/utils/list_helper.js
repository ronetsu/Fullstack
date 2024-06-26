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

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return blog.likes > max.likes ? blog : max
  }
  return blogs.length === 0
    ? null
    : blogs.reduce(reducer, blogs[0])
}

const mostLikesByAuthor = (blogs) => {
  const reducer = (authors, blog) => {
    const author = authors.find(a => a.author === blog.author)
    if (author) {
      author.likes += blog.likes
    } else {
      authors.push({ author: blog.author, likes: blog.likes })
    }
    return authors
  }
  const authors = blogs.reduce(reducer, [])
  return favoriteBlog(authors)
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostLikesByAuthor
}