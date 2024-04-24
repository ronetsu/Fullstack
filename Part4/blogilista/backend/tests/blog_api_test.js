const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const helper = require("./test_helper")

const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs")

  const titles = response.body.map(r => r.title)

  assert.ok(titles.includes("React patterns"))
})

test("blog identificator is named id", async () => {
  const response = await api.get("/api/blogs")

  assert.ok(response.body[0].id)
})

test.only("a valid blog can be added", async () => {
  const initialBlogs = await api.get("/api/blogs")

  const newBlog =  {
    title: "This is a test blog",
    author: "Tina Tester",
    url: "https://en.wikipedia.org/wiki/Test",
    likes: 34
  }

  await api.post("/api/blogs").send(newBlog)
  const response = await api.get("/api/blogs")

  assert.ok(initialBlogs.body.length + 1, response.body.length)
})

after(async () => {
  await mongoose.connection.close()
})