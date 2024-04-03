const { test, describe } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")
const testBlogs = require("./testBlogs")

test("dummy returns one", () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra'",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ]

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  } )

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(testBlogs)
    assert.strictEqual(result, 36)
  } )
})

describe("favorite blog", () => {
  test("when the list is bigger", () => {
    const result = listHelper.favoriteBlog(testBlogs).likes
    assert.deepStrictEqual(result, 12)
  })

  test("when the list is empty", () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test("when the list has multiple favorites", () => {
    const result = listHelper.favoriteBlog(testBlogs).likes
    assert.deepStrictEqual(result, 12)
  })
})
