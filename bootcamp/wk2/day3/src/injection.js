const sqlite3 = require('sqlite3').verbose();

/**
 * This code creates the tables for the Restaurants assignment
 */
function initialise() {
    // connect to a database named restaurants.sqlite
    const db = new sqlite3.Database('./restaurants.sqlite');

    try {
        db.serialize(function () { // serialize means execute one statement at a time

            console.log('starting select');

            const restaurantId = '1 OR 1=1'; // user input

            db.all(`SELECT * FROM RESTAURANTS where id=${restaurantId}`, [], (err, rows) => {
                if (err) {
                  throw err;
                }
                rows.forEach((row) => {
                  console.log(row.name);
                });
              });
       
        });
    } finally {
        // very important to always close database connections
        // else could lead to memory leaks
        db.close();
    }
}

module.exports = initialise;

// local testing (comment out if running tests from jest)
initialise();

