require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const db = require("./db")
const cors = require('cors')



const app = express()

// app.use(cors({
//     origin: 'https://movie-64l5t8675.vercel.app/'
// }))
app.use(express.json())

//get all films
app.get("/api/v1/films", async (req, res) => {

    try {
        const filmsRatingData = await db.query("select * from films left join (select films_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by films_id) reviews on films.id = reviews.films_id")
        res.status(200).json({
            status: "success",
            results: filmsRatingData.rows.length,
            data: {
                films: filmsRatingData.rows
            }
        })

    } catch (err) {
        console.log(err);

    }


})
//get individual film
app.get("/api/v1/films/:id", async (req, res) => {
    try {
        const films = await db.query("select * from films left join (select films_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by films_id) reviews on films.id = reviews.films_id where id =$1", [
            req.params.id])


            const reviews = await db.query("select * from reviews where films_id =$1", [
                req.params.id])
                
                
        res.status(200).json({
            status: "worked",
            data: {
                films: films.rows[0],
                reviews: reviews.rows
            }

        })
    } catch (err) {
        console.log(err)
    }
})


//create a new film
app.post("/api/v1/films", async (req, res) => {
    console.log(req.body)
    try{
        const results = await db.query("INSERT INTO films(name,genre) values($1, $2) returning *", [req.body.name, req.body.genre])
        console.log(results)
        res.status(201).json({
            status: "worked",
            data: {
                films: results.rows[0],
            }
    
        })

    }catch(err){
        console.log(err)
    }



    
})


// edit a film
app.put("/api/v1/films/:id", async (req, res) => {

    try{
        const results = await db.query("UPDATE films SET name = $1, genre = $2 where id = $3 returning *", 
        [req.body.name, req.body.genre, req.params.id])
        console.log(results)
        res.status(201).json({
            status: "worked",
            data: {
                films: results.rows[0],
            }
    
        })

    }catch(err){
        console.log(err)
    }
})
// delte a film
app.delete("/api/v1/films/:id",async (req, res) => {

    try{
    const results = await db.query("DELETE FROM films where id = $1",[req.params.id])
    console.log(results)
    res.status(204).json({
        status: "deleted",
    })
}catch(err){
    console.log(err)
}
})

// add a review to a film
app.post("/api/v1/films/:id/addReview", async (req, res)=>{

    try{
       const newReview = await db.query("INSERT INTO reviews (films_id, name, review, rating) VALUES ($1, $2, $3, $4 )returning *",
        [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: "success",
            data:{
                review: newReview.rows[0]
            }
        })
        
    }catch(err){}
})

module.exports = app

const port = process.env.PORT || 5432;
app.listen(port, () => {
    console.log(`listenting on ${port}`)
})