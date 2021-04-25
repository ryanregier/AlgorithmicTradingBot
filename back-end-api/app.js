const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://steven:admin123@cluster0.b3s46.mongodb.net/tradingbot?retryWrites=true&w=majority";
const port = 3500;

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req,res) => {
  res.send("hello");
});

//Used to easisly serve static files
//simply type localhost:port/images/*.* to get that static file
app.use(express.static('public'))
app.use(express.static('images'))
app.use(express.static('sound'))
app.use(express.static('html'))
app.use(express.static('txt'))

app.get('/positions', (req,res) => {

  MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true  }, async(err,client) =>{
    if(err != null){
      console.log(err)
      client.close();
    }else{
      const collection = client.db("tradingbot").collection("positions");
      const result = collection.find({},{sort:{created_at:-1}}).toArray().then((result) => {
        res.contentType('application/json');
        console.log("accountinfo result");
        console.log(result)
        res.json(result);
      }).then(()=>{client.close()});
    }
  });

})

app.get('/keystats/:sym', (req,res) => {

  MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true  }, async(err,client) =>{
    if(err != null){
      console.log(err)
    }else{
      const collection = client.db("tradingbot").collection("stockinfo");
      const result = collection.find({symbol:req.params.sym}).toArray().then((result=>{
        res.contentType('application/json');
        console.log("accountinfo result");
        console.log(result)
        res.json(result);
      }));
       
    }
  });

})

app.get('/googleId/:id', (req,res) => {

  MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true  }, async(err,client) =>{
    if(err != null){
      console.log(err)
    }else{
      const collection = client.db("tradingbot").collection("users");
      const result = collection.findOne({googleId:req.params.id}).then((result=>{
        console.log(result)
        res.send(result);
      }));

    }
  });

})

app.get('/account', (req,res) => {
    MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true  }, async(err,client) =>{
      if(err != null){
        console.log(err)
        client.close();
      }else{
        const collection = client.db("tradingbot").collection("accountinfo");
        
  
        const result = collection.find({},{sort:{created_at:1}}).limit(200).toArray().then((result) => {
          res.contentType('application/json');
          console.log("accountinfo result");
          console.log(result)
          res.json(result);
        }).then(()=>{client.close});
      }
    });
  });

app.get('/trades', (req,res) => {
    MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true  }, async(err,client) =>{
      if(err != null){
        console.log(err);
        client.close();
      }else{
        const collection = client.db("tradingbot").collection("histrades");
  
        const options = { sort:{timestamp:-1}, projection:{_id:0} };

        const result = collection.find({},options).limit(20).toArray().then((result) => {
          res.contentType('application/json');
          console.log("trades");
          console.log(result)
          res.json(result);
        }).then(()=>{client.close();});
      }
    });
  });

app.get('/login/:email/:password', async(req,res) => {
  //check the email and the password with database
  //send back null dictionary if false
  //send relevant user info is true
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, async(err, client) => {
    if(err !== null){
      console.log(err);
      client.close();
    }else{
      const query = {email: req.params.email, password: req.params.password};
      const options  = {
        projections: { 'firstName': 1, 'lastName': 1}
      };
      const collection = client.db("tradingbot").collection("users");
      const result = collection.findOne(query, options)
      .then( (result) =>{
        if(result){
          console.log(result);
          res.send(result.firstName.concat(" "+result.lastName));
        }else{
          if(result === null){
            console.log("sending null");
            res.send(null);
          }
        } 
      })
      .then((error, result) => {
        client.close();
      });//end of .then() block
    }
  });//end of MongoClient.connect
});//end of app.get

app.set('/login/:email/:password/:firstName/:lastName', async(req,res) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, async(err, client) => {
    if(err !== null){
      console.log(err);
      client.close();
    }else {
      const query = {email: req.params.email, password: req.params.password};
      const options  = {
        projections: { 'firstName': 1, 'lastName': 1}
      };

      const collection = client.db("tradingbot").collection("users");

      const result = collection.findOne(query, options)
          .then( (result) =>{
            if(result){
              console.log(result);
              res.send(result.firstName.concat(" "+result.lastName));
            }else{
              if(result === null){
                console.log("sending null");
                res.send(null);
              }
            }
          })
          .then((error, result) => {
            client.close();
          });
        }
  });//end of MongoClient.connect
});//end of app.get

app.set('/signup', async(req,res) =>{
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, async(err, client) => {
    if (err !== null) {
      console.log(err);
      client.close();
    } else {
      const collection = client.db("tradingbot").collection("users");
    }
  });

});

app.listen(port, ()=> console.log(`listening on ${port}`));