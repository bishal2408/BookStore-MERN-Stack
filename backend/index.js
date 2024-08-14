import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import bookRoute from "./routes/books.route.js"
import cors from 'cors'

const app = express()

// middleware for parsing request body
app.use(express.json())

// middleware for handling CORS policy
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: 'Content-Type'
    })
)

// routes
app.use('/books', bookRoute)


// default home route message
app.get('/', (request, response) => {
    response.status(234).json({message: "Welcome to node server"})
})


mongoose
.connect(mongoDBURL)
.then(() => {
    console.log("Connected to database!")
    app.listen(PORT, () => {
        console.log(`App is running on port: ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})

