const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises; // Node.js file system module with promises

async function load() { // returns a promise of an array
    // read the restaurant json file
    const rawData = await fsp.readFile('./restaurants.json');
    // convert the file data into JS objects (arrays)
    const restaurantsArray = (JSON.parse(String(rawData)));
    return restaurantsArray;
}

/*
 * Insert the data into the database
 * 
 * Note the use of try/finally to ensure resources get closed 
 * whether an error occurs or not
 * 
 */
function insert(restaurantsArray) {

    // use a persistent database named db.sqlite
    const db = new sqlite3.Database('./restaurants.sqlite');

    try {
        db.serialize(function () { // serialize means execute one statement at a time

            // loop through the restaurantsArray to get hold of the list of restaurants
            for (let i = 0; i < restaurantsArray.length; i++) {

                const currentRestaurant = restaurantsArray[i];

                let stmt;

                try {
                    // for security reasons - very important to use a 
                    // prepared statement here
                    stmt = db.prepare(`INSERT INTO RESTAURANTS (Name, imagelink) VALUES (?, ?)`);
                    stmt.run(currentRestaurant.name, currentRestaurant.image);
                } catch (error) {
                    console.error(error);
                } finally {
                    // IMPORTANT! Close the statement
                    stmt.finalize();
                }
            } // end for
        });
    } finally {
        // IMPORTANT! Close the database connection 
        db.close();
    }

    // main flow 
    console.log('starting populate');
    load()
        .then(restaurantsArray => {
            console.log("data loaded");
            insert(restaurantsArray);
            console.log("inserts complete");
        })
        .catch(err => {
            console.error("data could not be loaded");
        })}