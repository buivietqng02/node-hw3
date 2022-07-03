var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose= require('mongoose');
require('dotenv').config()
var usersRouter = require('./routes/users');
var loadRouter= require('./routes/load')
var truckRouter= require('./routes/truck')
const authenRouter= require('./routes/authenticate')
const fileUpload=require('express-fileupload')
const cors= require('cors');
var app = express();
const bodyParser= require('body-parser')

//add other middleware
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
  createParentPath: true
}));
app.use('/api/users', usersRouter);
app.use('/api/auth', authenRouter);
app.use('/api/trucks', truckRouter)
app.use('/api/loads', loadRouter);
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
const mongoURL= process.env.LOCAL_MONGO || process.env.GLOBAL_MONGO
try {
mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
const db= mongoose.connection;
db.once('open', ()=> {
  console.log('connected to db')
})
db.on('error', ()=> {
  console.log('error in mongoDb', String(error))
})

}
catch (err) {
  console.log('error when connect mongo DB')
}

module.exports = app;
