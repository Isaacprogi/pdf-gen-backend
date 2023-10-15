const express = require('express')
const app = express()
const env = require('dotenv')
const pdfRoutes = require('./routes/pdf')
const connectDB = require('./db/db')
const errorHandler = require('./middleware/errorHandler')


const cors = require('cors')
env.config()

app.use(express.static('pdf'));

app.use(express.json())


const port = process.env.PORT
app.use(cors())
app.use(errorHandler)

app.use('/api/pdf',pdfRoutes)

connectDB(process.env.MONGO_URL)

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})