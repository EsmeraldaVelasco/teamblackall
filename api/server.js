require('dotenv').config();
require('app-module-path').addPath(__dirname);

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');

const indexRouter = require('./routes/index');
const apiRouter=require('routes/api/v1/index');


const app = express();

//Connect to Mongo via Mongoose
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser:true
})
.then(()=>{
  console.log('!!Connected to Mongo')
})
.catch((error)=>{
  console.error(error)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));



app.use('/', indexRouter);
app.use('/api/v1', apiRouter);
app.use(cors());

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

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
