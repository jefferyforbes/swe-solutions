const sqlite3 = require('sqlite3').verbose();

// use a persistent database named db.sqlite
const db = new sqlite3.Database('./db.sqlite');

/**
 * Executes the SQL statements one at a time.
 * 
 * Note the use of try/finally to ensure resources get closed 
 * whether an error occurs or not
 * 
 */
try {
    db.serialize(function () { // serialize means execute one statement at a time

        // create the empty table with specific columns and column types
        db.run("CREATE TABLE CUSTOMERS (CustomerName TEXT, ContactName TEXT)");

        let stmt;

        // insert 2 rows
        try {
            stmt = db.prepare(`INSERT INTO CUSTOMERS VALUES 
                        ('Fred Flintstone', 'Wilma Flintstone') , 
                        ('Wilma Flintstone', 'Fred Flintstone')`);
            stmt.run();
        } finally {
            // release resources 
            stmt.finalize();
        }

        // select the rows and print them out
        db.each("SELECT * FROM CUSTOMERS",
            function (err, rows) {  // this is a callback function
                console.log(rows);  // rows contains the matching rows
            }
        );
    });
} finally {
    db.close();
}