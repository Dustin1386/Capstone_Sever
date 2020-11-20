function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          films,
          reviews
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE films_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE reviews_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('films_id_seq', 0)`),
          trx.raw(`SELECT setval('reviews_id_seq', 0)`),
        ])
      )
    )
  }
  
  function makeFilmsArray(){
    return[
        {
            id:"1",
            name:"john",
            genre:"horror"
        },
        {
            id:"2",
            name:"batman",
            genre:"horror"
        },
        {
            id:"3",
            name:"twins",
            genre:"horror"
        },
        {
            id:"4",
            name:"The Grey",
            genre:"horror"
        }

    ]
}

function makeReviews(films){
    [
        {
            id:1,
            name:"brad",
            films_id:films[0],
            review:"this movie was awesome",
            rating:3
        },
        {
            id:1,
            name:"chad",
            films_id:films[1],
            review:"this movie was awesome",
            rating:3
        },
        {
            id:1,
            name:"sad",
            films_id:films[2],
            review:"this movie was awesome",
            rating:3
        },
        {
            id:1,
            name:"dad",
            films_id:films[3],
            review:"this movie was awesome",
            rating:3
        }
    ]
}

function seedMovies(db,films) {
  return db
    .into('films')
    .insert(films)
}

function makeFilmsFixtures() {
  const testFilms = makeFilmsArray()
  const testReviews = makeReviews(testFilms)
  return { testFilms, testReviews}
}

module.exports = {
  makeFilmsArray,
  makeReviews,
  cleanTables,
  makeFilmsFixtures,
  seedMovies

}