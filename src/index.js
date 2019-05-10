const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

const app = express()

mongoose.connect("mongodb+srv://mongo:mudar123@cluster0-pvreh.mongodb.net/test?retryWrites=true",
{
    useNewUrlParser: true
})

app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))


const routes = require('./routes')
app.use(routes)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running in port ${port}`))