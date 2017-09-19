var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      console.log(req.body);
      models.messages.get(function(error, messages) {
        res.status(error ? 400 : 200).send(messages);
      });
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      console.log(req.body);
      models.messages.post(req.body, function(error, results) {
        res.status(error ? 400 : 201).send();
      });
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('Serving request type ' + req.method + ' for url ' + req.url);         
      models.users.get(function(error, users) {
        res.status(error ? 400 : 200).send(users);
      });
    },
    post: function (req, res) {
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      models.users.post(req.body, function(error, results) {
        res.status(error ? 400 : 201).send();
      });
    }
  }
};

