// add sqlite dependency
const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

// setup the database
let db = new sqlite3.Database(DBSOURCE, (err) => { // TODO - ask about this logic
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log('connected to the SQLite database...');

        db.serialize(() => {
            // the code as it stands, recreates the table each time the server is restarted
            db.run(`DROP TABLE users`,
                (err) => {
                    if (err) {
                        console.log('unable to delete table due to ' + err);
                    } else {
                        console.log('table deleted');
                    }
                });

            db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname text,
            lastname text
            )`,
                async (err) => {
                    if (err) {
                        console.log('table already created...');
                        // table already created
                    } else {
                        // table just created, creating some rows
                        console.log('table created - adding some rows...');
                        const insert = 'INSERT INTO users (firstname, lastname) VALUES (?,?)';
                        db.run(insert, ["fred", "flintsone"]);
                        db.run(insert, ["wilma", "flintsone"]);
                        db.run(insert, ["pebbles", "flintsone"]);
                        db.run(insert, ["Admin", "Istrator"]);
                    }
                });
        });
    }
})

module.exports = db