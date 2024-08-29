const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./Public/'))

console.log('im on a node server yo!');

app.get('/', function (req, res) {
  // res.send('Hello Node from Ex on local dev box')
  res.sendFile('index.html');
})

app.get('/ejs', (req,res)=>{
  
  res.render('index', {
    myServerVariable : "something from server"
  });

})

app.listen(3000)

