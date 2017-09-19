var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) { // a function which produces all the messages
      var queryAllMessages = 'SELECT messages.id, messages.message AS text, messages.roomname, users.name AS "username" FROM messages, users WHERE messages.user_id = users.id';
      db.query(queryAllMessages, function(err, results, fields) {
        if (err) { console.log(err); }
        cb(results);
      });
    }, 
    post: function (data, cb) { // a function which can be used to insert a message into the database
      module.exports.users.post({username: 'what'}, function(id) {
        console.log(id);
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (cb) {
      var queryAllUsers = 'SELECT * FROM users';
      db.query(queryAllUsers, function(err, results, fields) {
        if (err) { console.log(err); }
        cb(results);
      });
    },
    post: function (data, cb) {
      var queryUsername = 'SELECT * FROM users WHERE name = \'' + data.username + '\'';
      // var insertUsername = 'INSERT INTO users SET '
      db.query(queryUsername, function(err, results, fields) {
        if (err) { console.log(err); }
        if (results.length === 0) {
          db.query('INSERT INTO users SET ?', {name: data.username}, function(err, results, fields) {
            if (err) { console.log(err); }
            cb(results.insertId);
          });
        } else {
          console.log(results);
          cb(results[0].id);
        }
      });
    }
  }
};

