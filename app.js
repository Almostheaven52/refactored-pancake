require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://zach:${process.env.MONGO_PWD}@cluster0.ftfvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('Public'));
// const path = require('path')
// app.use('/static', express.static(path.join(__dirname, 'public')))



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




app.get('/', async (req, res)=>{

  await client.connect();

  let result = await client.db("zach-db").collection("class collection")
    .find({}).toArray();

  res.render('index', {
    postData : result
  });
  // res.sendFile('index.html')

})

//ejs stuff
app.get('/ejs', (req,res)=>{
  ``
    res.render('index', {
      myServerVariable : "This is an ejs page"
    });
  
    //can you get content from client...to console? 

})


app.get('/read', async (req,res)=>{

    console.log('in /read');
    await client.connect();
    
    console.log('connected?');
    // Send a ping to confirm a successful connection
    
    let result = await client.db("zach-db").collection("class collection")
      .find({}).toArray(); 
    console.log(result); 
  
    res.render('read', {
      postData : result
    });
  
})

app.post('/insert', async (req,res)=> {

  console.log('in /insert');
  //connect to db,
  console.log(req.body);
  await client.connect();
  //point to the collection 
  await client.db("zach-db").collection("class collection").insertOne({ name: req.body.userName});
  //await client.db("zach-db").collection("class collection").insertOne({ iJustMadeThisUp: 'hardcoded new key '});  
  //insert into it
  res.redirect(`/?name=${req.body.userName}`);

});

app.post('/update', async (req,res)=>{

  console.log("req.body.nameID: ", req.body.nameID)

  client.connect; 
  const collection = client.db("zach-db").collection("class collection");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.body.nameID)}, { $set: {"name": req.body.nameUpdate } }
)
.then(result => {
  console.log(result); 
  res.redirect('/');
})
});


app.post('/delete/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("zach-db").collection("class collection");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)})

  .then(result => {
    console.log(result); 
    res.redirect('/');
  })
})

//app.listen(3000);
app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});