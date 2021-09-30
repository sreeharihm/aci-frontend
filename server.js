const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://sreehari:sreehari@cluster0.7p8kq.mongodb.net/BlogApp?retryWrites=true&w=majority";
var db

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('BlogApp')
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
app.get('/fruits', function (req, res) {
  var data = {
    "Fruits": [
      "apple",
      "orange"    ]
  };  
  res.json(data);
});

app.get('/', function(req, res) {
    res.send('Hello World')
})
app.get('/getsharedCollection', (req, res) => {    
    db.collection('posts').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.send(result)
      })
  }) 

/* app.listen(3000, function() {
    console.log('listening on port ' + 3000);
   }); */
   var listener = app.listen(process.env.PORT || 80, function() {
    console.log('listening on port ' + listener.address().port);
   });