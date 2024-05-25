// var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server);
// database
app.use('/api/v1/users', require('./routes/users'));
// app.use(require('./dbs/mongodb'));
const connectMongoDB = require('./dbs/mongodb');

app.use(express.static('public'))
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
connectMongoDB()
app.use('/', require('./routes'));
app.use('/edit/:_id', require('./routes')); // Assuming router.js is in the same directory
//render

module.exports = app;

