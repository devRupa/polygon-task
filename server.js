const express = require('express');
const app = express();
const port = 3000;

const fileUpload = require('express-fileupload');

const session = require('express-session');
const flash = require('express-flash-messages');
const Cron = require('node-cron');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
const fs = require('fs');
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }))

app.use(session({
  secret: 'something',
  cookie: { maxAge: 2 * 86400 * 1000 },
  maxAge: new Date(Date.now() + (30 * 86400 * 1000)),
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.isAuth = req.session.isAuth;
  next();
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
global.__basedir = __dirname;

const homeRoute=require('./routes/homeRoute');
const authRoute=require('./routes/authRoute');
const dashboardRoute=require('./routes/dashboardRoute');
app.use('/',homeRoute);
app.use('/',authRoute);
app.use('/',dashboardRoute);

app.listen(3000, (err, res) => {
  console.log('Server running on ' + port);
})