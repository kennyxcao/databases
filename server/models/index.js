var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) { // a function which produces all the messages
      db.query('SELECT * FROM messages', function(err, results, fields) {
        if (err) { console.log(err); }
        console.log(results);
        //console.log(fields);
        cb(results);
      });
    }, 
    post: function () { // a function which can be used to insert a message into the database
      
    } 
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

