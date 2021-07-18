const sqlite3 = require('sqlite3').verbose();

/**
 * This code inserts some rows in the tables for the Restaurants assignment
 */
function insert() {
    // connect to a database named restaurants.sqlite
    const db = new sqlite3.Database('./restaurants.sqlite');

    try {
        db.serialize(function () { // serialize means execute one statement at a time

            console.log('inserting some data');

            let stmt;

            // insert a row into the RESTAURANTS table
            try {
                // for security reasons - very important to use a 
                // prepared statement here
                stmt = db.prepare(`INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)`);
                stmt.run("hells kitchen", "https://www.imdb.com/title/tt0437005/");

            } finally {
                // IMPORTANT! Close the statement
                stmt.finalize();
            }


                    // select the rows and print them out
        db.each("SELECT restaurants.name, count(menus.id) FROM restaurants JOIN menus ON restaurants.id = menus.restaurant_id GROUP BY restaurants.id",
        function (err, rows) {  
            console.log(rows);  
        }
    );
           // db.run("SELECT restaurants.name, count(menus.id) FROM restaurants JOIN menus ON restaurants.id = menus.restaurant_id GROUP BY restaurants.id");

        });
    } finally {
        // very important to always close database connections
        // else could lead to memory leaks
        db.close();
        console.log('table insert complete - connection closed');
    }
}

module.exports = insert;

// local testing (comment out if running tests from jest)
insert();

