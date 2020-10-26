const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000

app.use(router)
app.use(express.urlencoded({extended: true}))

app.listen(port, () => console.log(`listening at ${port}`))