const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('index', index);
app.use('users', users);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.use(function(err, req, res, next) {
  const response = { message: err.message }
  if(req.app.get('env') === 'developemnt') {
    response.stack = err.stack
  }

  res.status(err.status || 500);

})

module.exports = app;
