const app = require("../server")
const supertest = require("supertest")
const knex = require("knex")
const helpers = require("./helpers")
const chai = require("chai")

describe("server test", function () {
  before("make instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set("db", db);
  })

  const testFilms = helpers.makeFilmsArray()

  after("disconnect from db", () => db.destroy())

  before("cleanup", () => helpers.cleanTables(db))

  afterEach("cleanup", () => helpers.cleanTables(db))

  // Get all films

  describe("GET /films", () => {
    context("Given there are no films in the database", () => {
      it("responds with 200 and an empty array", () => {
        return supertest(app)
          .get("/api/v1/films")
          .expect(200, {
            status: "success",
            results: 0,
            data: { films: [] },
          })
      })
    })
    context("Given there are films in the database", () => {
      console.log(testFilms);
      beforeEach("insert films", () => {
        return helpers.seedMovies(db, testFilms);
      })
      it("responds with 200 and with all films", () => {
        return supertest(app)
          .get("/api/v1/films")
          .expect(200, {
            status: "success",
            results: 4,
            data: { films: testFilms },
          })
      })
    //  Test for Single film
      it("responds with 200 and a single film", () => {
        return supertest(app)
          .get("/api/v1/films/1")
          .expect(200, {
            status: "worked",
            data: {
              films: {
                id: "1",
                name: "john",
                genre: "horror",
              },
              reviews: [],
            },
          })
      })
    })
  })
})
