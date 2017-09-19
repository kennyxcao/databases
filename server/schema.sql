DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

/*
CREATE TABLE rooms (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);
*/

CREATE TABLE messages (
  /* Describe your table here.*/
  id INTEGER NOT NULL AUTO_INCREMENT,
  message VARCHAR(300) NOT NULL,
  roomname VARCHAR(50) NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/

