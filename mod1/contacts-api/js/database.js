// add sqlite dependency
const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

// setup the database
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('connected to the SQLite database...');

        db.serialize(() => {
            // the code as it stands, recreates the table each time the server is restarted
            db.run(`DROP TABLE contacts`,
                (err) => {
                    if (err) {
                        console.log('unable to delete table due to ' + err);
                    } else {
                        console.log('table deleted');
                    }
                });

            db.run(`CREATE TABLE contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            name text 
            )`,
                (err) => {
                    if (err) {
                        console.log('table already created...');
                        // table already created
                    } else {
                        // table just created, creating some rows
                        console.log('table created - adding some rows...');
                        const insert = 'INSERT INTO contacts (userId, name) VALUES (?,?)';
                        db.run(insert, ["mandy", "aran"]);
                        db.run(insert, ["mandy", "bob"]);
                        db.run(insert, ["fred", "bob"]);
                    }
                });
        });
    }
});


module.exports = db
