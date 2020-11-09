require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const db = require("./db")


const app = express()

app.use(express.json())

//get all films
app.get("/api/v1/films", async (req, res)=>{
  const results = await  db.query('select * from movie');
  console.log(results)
    res.status(200).json({
        status: "success",
        data:{
            movie: ['A Few Good Men', 'the good the bad and the ugly', 'Predator']
        }
    })
})
//get individual film
app.get("/api/v1/movie/:id",(req, res)=>{
    res.status(200).json({
        status: "worked",
        data:{
            movie: "movie 43"
        }

    })
})


//store a film
app.post("/api/v1/films", (req, res)=>{
    console.log(req.body)

    res.status(201).json({
        status: "worked",
        data:{
            movie: "movie 43"
        }

    })
})



app.put("/api/v1/films/:id",(req, res)=>{

    res.status(200).json({
        status: "worked",
        data:{
            movie: "movie 43"
        }

    })
})

app.delete("/api/v1/films/:id", (req, res)=>{
    res.status(204).json({
        status: "deleted",
    })
})

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`listenting on ${port}`)
})