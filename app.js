const express = require('express')
const app = express()

app.use(express.static('./public/'))

console.log('im on a node server, yo');

app.get('/', function (req, res) {
  res.sendFile(path.resolve('index.html'))
})


app.get('/ejs', (req,res)=>{

  res.render('index', {
    myServerVariable : "something from the server"
  });

})

app.listen(5000)