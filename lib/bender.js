var express = require('express');
var app = express();
var Message = require('./controllers/message');

// var chromecast = require('./extensions/chromecast');

app.get('/', function(req, res) {
  res.status(200).send({ hello: 'world' });
});

app.post('/message', function(req, res) {
  if (!req.body.sender || !req.body.message) {
    res.status(408).send({ errors: [ 'Sender and message are required fields' ] });
  }

  Message.create(req.body).then(function(res) {
    res.status(201).send({ message: 'Finished!' });
  });
});

module.exports = app;
