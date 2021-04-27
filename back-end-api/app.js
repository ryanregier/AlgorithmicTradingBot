const express = require('express');
const app = express()
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://steven:admin123@cluster0.b3s46.mongodb.net/tradingbot?retryWrites=true&w=majority";
const port = 3500;

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
//app.use(urlencodedParser);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/*
MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true  }, async(err,client) =>{
  console.log("updating mongoDB")
  if(err != null){
    console.log(err)
    client.close();
  }else{
    const collection = client.db("tradingbot").collection("users");
    const result = collection.updateOne({username:"steven"}, {$set:{"googleId":"111237288603505912027"}}).then((result) => {
      console.log(result);
    }).then(()=>{client.close()});
  }
});
 */




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
        //console.log("accountinfo result");
        //console.log(result)
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
        //console.log("accountinfo result");
        //console.log(result)
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
        res.contentType('application/json');
        console.log(result)
        res.json(result);
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
          //console.log("accountinfo result");
          //console.log(result)
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
          //console.log("trades");
          //console.log(result)
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
      console.log("This is a test");
      const collection = client.db("tradingbot").collection("users");
    }
  });
});

app.get("/accountinfo/:email/:password", async(req,res) => {

  const email = req.params.email;
  const password = req.params.password;
  console.log("test1");
  console.log(email + " " + password)
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, async(err, client) => {
    if (err !== null) {
      console.log(err);
      console.log("test2");
      client.close();
    } else {
      console.log("test3");
      const query = {email: req.params.email, password: req.params.password};
      const collection = client.db("tradingbot").collection("users");

      console.log("test4");
      const result = collection.findOne(query)
          .then( (result) =>{
            console.log("test6");
            if(result){
              console.log("test7");
              console.log(result);
              const userInfo = {
                username: result.username,
                role: result.role,
                dateCreated: result.dateCreated,
                email: result.email,
                password: result.password,
                firstName: result.firstName,
                lastName: result.lastName,
                accountId: result.accountId,
                googleId: result.googleId
              }
              console.log("User Info:")
              console.log(userInfo)
              res.setHeader("Content-Type", "application/json");
              res.send(JSON.stringify(userInfo));
            }else{
              console.log("test8");
              if(result === null){
                console.log("test9");
                console.log("sending null This is a big bad, how are they logged in with out a user");
                res.send(null);
              }
            }
            client.close();
          })
          .then((error, result) => {
            console.log("test5");
          client.close();
          });
    }
  });
});

app.post('/signup', async(req,res) =>{
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, async(err, client) => {
    if (err !== null) {
      console.log(err);
      client.close();
    } else {
      console.log("This is a test4")
      console.log(req.body);

      const collection = client.db("tradingbot").collection("users");
      const cursor = await collection.find().project({accountId: 1, _id: 0}).toArray();
      let newCurrentId= 0;
      for (let cursorKey in cursor) {
        let num = parseInt(cursorKey);
        if(num >= newCurrentId){
          newCurrentId = num+1;
        }
      }

      const toInsert = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        username: req.body.firstname,
        password: req.body.password,
        googleId: null,
        role: "user",
        currentId: newCurrentId,
      };
      await collection.insertOne(toInsert);

      client.close();
    }
  });
});

//urlencodedParser
app.post('/accountchange', async(req,res) =>{
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, async(err, client) => {
    if (err !== null) {
      console.log(err);
      client.close();
    } else {
    const filter =
        {
          googleId: req.body.googleId,
          accountId: req.body.googleId
        };
    const updated =
        {
          $set: {username: req.body.username, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password }
        }
        console.log(req.body);
      console.log("This is the right test2");
      const collection = client.db("tradingbot").collection("users");
      collection.findOneAndUpdate(filter,updated);
    }
  });
});


app.listen(port, ()=> console.log(`listening on ${port}`));