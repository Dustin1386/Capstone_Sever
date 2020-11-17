const app = require('../server')
const supertest = require('supertest')

describe('GET /api/v1/films',()=>{
    it.only('GET / responds with 200 and a list of films',()=>{
        return supertest(app)
        .get('/api/v1/films')
        .expect(200,)
    })
})

describe('GET /films/:id',()=>{
    it('GET /films/:id by ID from the server',()=>{
        const newFilm = films
        return supertest(app)
        .get('/films/:id')
        .expect(200,newFilm)
    })
})

describe('POST /films',()=>{
    it('POST /films new film',()=>{
        return supertest(app)
        .post('films')
        .expect(201, 'content created')
    })
})

describe('POST /films',()=>{
    it('POST /films/:id/addReview new film review',()=>{
        return supertest(app)
        .post('films')
        .expect(201, 'content created')
    })
})

describe('DELETE /films',()=>{
    it('DELETE /films/:id delete film from DB',()=>{
        return supertest(app)
        .delete('films')
        .expect(204, 'No Content')
    })
})