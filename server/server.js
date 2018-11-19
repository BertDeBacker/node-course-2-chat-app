const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '../public')
const post = process.end.PORT || 3000

const app = express()
app.use(express.static(publicPath));

//app.set('view engine', 'pug');

app.listen(port, () => {
    console.log(`server up and listening at port ${port}`)
    console.log(`http://localhost:${port}`)
})