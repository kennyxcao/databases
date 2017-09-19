var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) { // a function which produces all the messages
      var queryAllMessages = 'SELECT messages.id, messages.message AS text, messages.roomname, users.name AS "username" FROM messages, users WHERE messages.user_id = users.id';
      db.query(queryAllMessages, function(error, messages, fields) {
        if (error) { console.log(error); }
        cb(error, messages);
      });
    }, 
    post: function (data, cb) { // a function which can be used to insert a message into the database
      module.exports.users.post(data, function(error, userId) { // checks if username exists and get its user_id
        if (!error) {
          var newRow = {
            'message': data.text,
            'roomname': data.roomname,
            'user_id': userId
          };
          db.query('INSERT INTO messages SET ?', newRow, function(error, results, fields) {
            if (error) { console.log(error); }
            cb(error, results);
          });
        } else {
          cb(error, null);
        }
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (cb) {
      var queryAllUsers = 'SELECT * FROM users';
      db.query(queryAllUsers, function(error, users, fields) {
        if (error) { console.log(error); }
        cb(error, users);
      });
    },
    post: function (data, cb) {
      var queryUsername = 'SELECT * FROM users WHERE name = \'' + data.username + '\'';
      db.query(queryUsername, function(error, results, fields) {
        if (error) { console.log(error); }
        if (results.length > 0) {
          cb(error, results[0].id);
        } else {
          db.query('INSERT INTO users SET ?', {name: data.username}, function(error, results, fields) {
            if (error) { console.log(error); }
            cb(error, results.insertId);
          });          
        }
      });
    }
  }
};

