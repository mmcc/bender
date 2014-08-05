var Promise = require('bluebird');
var redis = require('redis');

client = Promise.promisifyAll(redis.createClient());

var Message = {};

Message.create = function(options) {
  var sender = options.sender;
  var to = options.to || 'All';
  var msg = options.msg;
  var timestamp = Date.now();
  var key = 'message:'+ timestamp;

  var body = {
    sender: sender,
    to: to,
    timestamp: timestamp,
    msg: msg
  };

  return Promise.all([
          client.setAsync(key, JSON.stringify(body)),
          client.lpushAsync(sender +':messages:out', key),
          client.lpushAsync(to +':messages:in', key)
         ]);
};

// user is the user who's messages we're retrieving
// status is unread, sent
Message.list = function(user, status) {
  var key;
  if (status == 'unread') {
    key = 'in';
  } else {
    key = 'out';
  }

  // implement
};

Message.get = function(key) {
  return client.getAsync(key);
};

module.exports = Message;
