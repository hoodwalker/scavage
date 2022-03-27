const express = require("express")
const dotenv = require("dotenv").config()
const colors = require('colors')
const bodyParser = require('body-parser')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

// Middleware
bodyParser.json()

// Routes
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/profiles', require('./routes/profileRoutes'))
app.use('/api/hunts', require('./routes/huntRoutes'))
app.use('/api/bounties', require('./routes/bountyRoutes'))
app.use('/api/captures', require('./routes/captureRoutes'))
app.use('/api/teams', require('./routes/teamRoutes'))

// Error Handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))