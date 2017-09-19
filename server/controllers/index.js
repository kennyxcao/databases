var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      console.log(req.body);
      models.messages.get(function(messages) {
        console.log(messages);
        res.status(200).send(messages);
      });
    }, 
    post: function (req, res) { // a function which handles posting a message to the database
      console.log('Serving request type ' + req.method + ' for url ' + req.url);
      console.log(req.body);
      //console.log(typeof req.body);
      models.messages.post(req.body, function(err) {
        var statusCode = err ? 400 : 201;
        res.status(statusCode).send();
      });
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('Serving request type ' + req.method + ' for url ' + req.url);         
      
    },
    post: function (req, res) {
      console.log('Serving request type ' + req.method + ' for url ' + req.url);         
    }
  }
};

