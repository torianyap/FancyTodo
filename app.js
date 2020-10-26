const express = require('express')
const router = require('./server/routes')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))
app.use(router)

app.listen(port, () => console.log(`listening at ${port}`))