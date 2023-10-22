const express = require('express')
const app = express()
const env = require('dotenv')
const chartRoutes = require('./routes/chart')
const connectDB = require('./db/db')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')


env.config()
app.use(express.json())

app.use(cors())
app.use(errorHandler)

app.use('/api/chart',chartRoutes)

const port = process.env.PORT

connectDB(process.env.MONGO_URL)


app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})