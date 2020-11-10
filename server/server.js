require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const db = require("./db")


const app = express()

app.use(express.json())

//get all films
app.get("/api/v1/films", async (req, res) => {

    try {
        const results = await db.query('select * from movie');
        console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                movie: results.rows
            }
        })

    } catch (err) {
        console.log(err);

    }


})
//get individual film
app.get("/api/v1/films/:id", async (req, res) => {
    try {
        const results = await db.query("select * from movie where id =$1", [
            req.params.id])
        res.status(200).json({
            status: "worked",
            data: {
                movie: results.rows[0],
            }

        })
    } catch (err) {
        console.log(err)
    }
})


//store a film
app.post("/api/v1/films", async (req, res) => {
    console.log(req.body)

    try{
        const results = await db.query("INSERT INTO movie(name,genre) values($1, $2) returning *", [req.body.name, req.body.genre])
        console.log(results)
        res.status(201).json({
            status: "worked",
            data: {
                movie: results.rows[0],
            }
    
        })

    }catch(err){
        console.log(err)
    }



    
})


// edit a film
app.put("/api/v1/films/:id", async (req, res) => {

    try{
        const results = await db.query("UPDATE movie SET name = $1, genre = $2 where id = $3 returning *", 
        [req.body.name, req.body.genre, req.params.id])
        console.log(results)
        res.status(201).json({
            status: "worked",
            data: {
                movie: results.rows[0],
            }
    
        })

    }catch(err){
        console.log(err)
    }
})
// delte a film
app.delete("/api/v1/films/:id",async (req, res) => {

    try{
    const results = await db.query("DELETE FROM movie where id = $1",[req.params.id])
    console.log(results)
    res.status(204).json({
        status: "deleted",
    })
}catch(err){
    console.log(err)
}
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`listenting on ${port}`)
})