require('dotenv').config()

const express = require('express')
const router = require('./server/routes')
const error_handler = require('./server/middlewares/error_handler')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(error_handler)

app.listen(port, () => console.log(`listening at ${port}`))