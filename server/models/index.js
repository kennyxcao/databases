var db = require('../db');
var Sequelize = require('sequelize');

// Sequelize working solution
module.exports = {
  messages: {
    get: function (cb) { // a function which produces all the messages
      db.Message.findAll({include: [{model: db.User, required: true, attributes: ['username']}]})
        .then((messages) => {
          messages = messages.map(message => {
            return Object.assign({},
              {
                id: message.id,
                text: message.text,
                roomname: message.roomname,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt,
                username: message.user.username
              });
          });
          cb(null, messages);
        })
        .catch((error) => {
          console.error(error);
          cb(error, null);
        });
    }, 
    post: function (data, cb) { // a function which can be used to insert a message into the database
      module.exports.users.post(data, (error, user) => {
        var userId = user.dataValues.id;
        var newRow = {
          'text': data.text,
          'roomname': data.roomname,
          'user_id': userId
        };        
        db.Message.create(newRow)
          .then(() => cb(null, null))
          .catch((error) => cb(error, null));
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (cb) {
      db.User.findAll()
        .then((users) => {
          cb(null, users);
        })
        .catch((error) => {
          cb(error, null);
        });      
    },
    post: function (data, cb) {
      db.User.sync()
        .then(function() {
          return db.User.findOrCreate({where: {username: data.username}});
        })
        .spread((user, created) => {
          cb(null, user);
        })
        .catch((error) => {
          console.error(error);
          cb(error, null);
        });
    }
  }
};

// MYSQL working solution
// module.exports = {
//   messages: {
//     get: function (cb) { // a function which produces all the messages
//       var queryAllMessages = 'SELECT messages.id, messages.message AS text, messages.roomname, users.name AS "username" FROM messages, users WHERE messages.user_id = users.id';
//       db.query(queryAllMessages, function(error, messages, fields) {
//         if (error) { console.log(error); }
//         cb(error, messages);
//       });
//     }, 
//     post: function (data, cb) { // a function which can be used to insert a message into the database
//       module.exports.users.post(data, function(error, userId) { // checks if username exists and get its user_id
//         if (!error) {
//           var newRow = {
//             'message': data.text,
//             'roomname': data.roomname,
//             'user_id': userId
//           };
//           db.query('INSERT INTO messages SET ?', newRow, function(error, results, fields) {
//             if (error) { console.log(error); }
//             cb(error, results);
//           });
//         } else {
//           cb(error, null);
//         }
//       });
//     } 
//   },

//   users: {
//     // Ditto as above.
//     get: function (cb) {
//       var queryAllUsers = 'SELECT * FROM users';
//       db.query(queryAllUsers, function(error, users, fields) {
//         if (error) { console.log(error); }
//         cb(error, users);
//       });
//     },
//     post: function (data, cb) {
//       var queryUsername = 'SELECT * FROM users WHERE name = \'' + data.username + '\'';
//       db.query(queryUsername, function(error, results, fields) {
//         if (error) { console.log(error); }
//         if (results.length > 0) {
//           cb(error, results[0].id);
//         } else {
//           db.query('INSERT INTO users SET ?', {name: data.username}, function(error, results, fields) {
//             if (error) { console.log(error); }
//             cb(error, results.insertId);
//           });          
//         }
//       });
//     }
//   }
// };


