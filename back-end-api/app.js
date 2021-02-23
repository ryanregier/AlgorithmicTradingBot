var express = require('express');

var app = express();

app.get('/', (req,res) => {
  res.send("hello");
});

app.get('/users', (req,res) => {//getting from a certian route or path
  
  res.send("getting user data from the database");
});

app.get('/users/:id', (req,res)=> {
    req.params.id;
    res.send(`getting user id ${req.params.id}'s data from database`);
});

app.get('/login/:email/:password', (req,res) => {
  //check the email and the password with database
  //send back null dictionary if false
  //send relevant user info is true
});

const port = process.env.PORT || 3000;

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
module.exports = app;
