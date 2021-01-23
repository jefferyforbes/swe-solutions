const sqlite3 = require('sqlite3').verbose();

/**
 * This code illustrates how to connect to the sqlite
 * in-memory database to prove the that sqlite is installed
 * correctly.
 */
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});