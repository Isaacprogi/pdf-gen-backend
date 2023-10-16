const express = require('express')
const app = express()
const env = require('dotenv')
const pdfRoutes = require('./routes/pdf')
const connectDB = require('./db/db')
const errorHandler = require('./middleware/errorHandler')
const invoiceRoute = require('./routes/invoice')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const homeRoutes = require('./routes/home-routes')


const cors = require('cors')
env.config()

app.use(expressLayouts)
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(homeRoutes.routes)

app.use(express.static('pdf'));

app.use(express.json())
app.use(invoiceRoute)


const port = process.env.PORT
app.use(cors())
app.use(errorHandler)

app.use('/api/pdf',pdfRoutes)

connectDB(process.env.MONGO_URL)

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})