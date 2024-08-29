const express = require('express')
const app = express()
app.use(express.static('./public/'))

console.log('im on a node server, yo');

app.get('/', function (req, res) {
  res.sendFile('index.html')
})


app.listen(5000)