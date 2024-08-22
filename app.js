const app = express()

console.log('Im on a node server, yo');

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)