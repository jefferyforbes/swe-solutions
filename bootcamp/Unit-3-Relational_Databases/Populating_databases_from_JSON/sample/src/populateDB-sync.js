const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises; // Node.js file system module with promises

/*
 * Insert the data into the database
 * 
 * Note the use of try/finally to ensure resources get closed 
 * whether an error occurs or not
 * 
 */
async function loadAndInsert() {

    // use a persistent database named db.sqlite
    const db = new sqlite3.Database('./restaurants.sqlite');

    try {
        // read the restaurant json file
        const rawData = await fsp.readFile('./restaurants.json');
        // convert the file data into JS objects (arrays)
        const restaurantsArray = (JSON.parse(String(rawData)));

        db.serialize(function () { // serialize means execute one statement at a time

            let menuCounter = 1;

            // loop through the restaurantsArray to get hold of the list of restaurants
            for (let i = 0; i < restaurantsArray.length; i++) {

                const currentRestaurant = restaurantsArray[i];

                let stmt;

                try {
                    // for security reasons - very important to use a 
                    // prepared statement here
                    stmt = db.prepare(`INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)`);
                    stmt.run(currentRestaurant.name, currentRestaurant.image);
                } finally {
                    // IMPORTANT! Close the statement
                    stmt.finalize();
                }

                for (j = 0; j < currentRestaurant.menus.length; j++) {
                    const currentMenu = currentRestaurant.menus[j];
                    try {
                        stmt = db.prepare(`INSERT INTO MENUS (title, restaurant_id) VALUES (?, ?)`);
                        stmt.run(currentMenu.title, i + 1);
                    } finally {
                        // IMPORTANT! Close the statement
                        stmt.finalize();
                    }

                    for (k = 0; k < currentMenu.items.length; k++) {
                        const currentMenuItem = currentMenu.items[k];

                        try {
                            stmt = db.prepare(`INSERT INTO MENU_ITEMS (name, price, menu_id) VALUES (?, ?, ?)`);
                            stmt.run(currentMenuItem.name, currentMenuItem.price, menuCounter);
                        } finally {
                            // IMPORTANT! Close the statement
                            stmt.finalize();
                        }
                    }

                    menuCounter++;
                }
            } // end for

        });
    } finally {
        // IMPORTANT! Close the database connection 
        db.close();
    }
}

module.exports = loadAndInsert

// main flow (comment out if running tests)
console.log('starting populate');
loadAndInsert();
console.log('completed populate');


