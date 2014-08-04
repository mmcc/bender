var express = require('express');
var app = express();

var chromecast = require('./extensions/chromecast');

app.get('/', function(req, res) {
  res.status(200).send({ hello: 'world' });
});

app.post('', function(req, res) {

});

module.exports = app;
