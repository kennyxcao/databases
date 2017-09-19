var mysql = require('mysql');
var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// dbConnection = mysql.createConnection({
//   user: 'root',
//   password: 'plantlife',
//   database: 'chat'
// });

// dbConnection.connect();

// module.exports = dbConnection;


var db = new Sequelize('chat', 'root', 'plantlife');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('users', {
  'username': {
    type: Sequelize.STRING,
    field: 'name'
  },
  'createdAt': Sequelize.DATE,
  'updatedAt': Sequelize.DATE   
});

var Message = db.define('messages', {
  'user_id': Sequelize.INTEGER,
  'text': {
    type: Sequelize.STRING,
    field: 'message'
  },
  'roomname': Sequelize.STRING,
  'createdAt': Sequelize.DATE,
  'updatedAt': Sequelize.DATE
});

Message.belongsTo(User, {foreignKey: 'user_id'});

module.exports.db = db;
module.exports.User = User;
module.exports.Message = Message;