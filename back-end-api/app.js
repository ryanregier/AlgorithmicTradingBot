const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://steven:admin123@cluster0.b3s46.mongodb.net/tradingbot?retryWrites=true&w=majority";
const port = 3500;
const cors = require("cors");

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/', (req,res) => {
  res.send("hello");
});

app.get('/login/:email/:password', async(req,res) => {
  //check the email and the password with database
  //send back null dictionary if false
  //send relevant user info is true

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  }, async(err, client) => {
    if(err !== null){
      console.log(err);
    }else{

      const query = {email: req.params.email, password: req.params.password};
      const options  = {
        projections: { 'firstName': 1, 'lastName': 1}
      };

      const collection = client.db("tradingbot").collection("users");

      const result = collection.findOne(query, options)
      .then( (result) =>{
        if(result){
         // console.log(result);
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

function errorFunc(error) {
  console.log(error);
}

/*
app.post('/update/:id'){
  res.send(`Updating information for user ${id}`);
};
*/

app.use(cors());
app.listen(port, ()=> console.log(`listening on ${port}`));


/** 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


*/
//export default app;
