const express = require('express');
const bodyParser = require("body-parser")
require("dotenv").config()


// ------- Import Modules ---------
const connectToMongoDb = require("./config/db")
const BlogRouter = require("./routes/blogRoute")
const UserRouter = require("./routes/userRoute")

const controllers = require("./controller/userController")
const controller = require("./controller/blogController")
const authentication = require("./Auth/auth")

const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ----  connecting to MongoDB Database ---
connectToMongoDb()


//  -------- Use API Routes --------------
app.use('/blogs', authentication, BlogRouter)


// app.use('/blogs', authentication ,BlogRouter)

//  ----- API Home Route ---------
app.get('/blog', controller.homeRoute)
app.get('/blog/:id', controller.getAPublishedBlog)

//  -------- Get All Routes ----
app.get('/', (req, res) => {
    res.status(200)
    res.send('Welcome to the Blogging APP, To access the endpoint please use the route (/blog)')
})




/* Handles Signup request */
app.post('/signup', controllers.signup)
app.post('/login', controllers.login)


// ------ Server Configuration -----
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = app;