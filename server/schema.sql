CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  message TEXT NOT NULL,
  roomname TEXT NOT NULL
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

