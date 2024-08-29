const express = require('express')
const app = express()

console.log('im on a node server, yo');

app.get('/', function (req, res) {
  res.send('Hello Node from Ex on local dev box')
})

app.listen(5000)

app.use(express.static('./index.html'))
