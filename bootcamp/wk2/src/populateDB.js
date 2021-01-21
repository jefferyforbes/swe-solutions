const sqlite3 = require('sqlite3').verbose();
const fsp = require('fs').promises; // Node.js file system module with promises
const path = require('path'); // Node.js directories and file paths module

// use a persistent database named db.sqlite
const db = new sqlite3.Database('./restaurants.sqlite');

/**
 * Loads the JSON file into an array
 */
async function load() {
    console.log('calling load');
    const restaurantFile = path.join(__dirname, 'restaurants.json');
    // asynchronously read the content of the restaurant data file
    const buffer = await fsp.readFile(restaurantFile);
    const restaurants = (JSON.parse(String(buffer)));
    return restaurants;
}

/**
 * Insert the JSON into our database.
 */
async function insert(data) {
    try {
        db.serialize(function () { // serialize means execute one statement at a time

            let insertRestaurant, insertMenu, insertItem;

            try {
                // Declare our SQL commands to run within the for loops, the "?"s are taken as parameters within the .run() method
                // so for example with this command "INSERT INTO RESTAURANTS (name, imagelink) VALUES (?, ?)"
                //                          the .run(firstParameter, secontParameter)    firstParameter^  ^secondParameter
                insertRestaurant = db.prepare("INSERT INTO RESTAURANTS (name, imagelink) VALUES (?,?)");
                insertMenu = db.prepare("INSERT INTO MENUS (title, restaurant_id) VALUES (?,?)");
                insertItem = db.prepare("INSERT INTO MENU_ITEMS (menu_id, name, price) VALUES (?,?,?)");

                let menus = []; // Empty array to store every menu with its items for later use
                for (let i = 0; i < data.length; i++) { // Iterate our entire array of restaurants objects
                    insertRestaurant.run(data[i].name, data[i].image) // Add the name and image of the restaurant we currently at to the database

                    for (let i2 = 0; i2 < data[i].menus.length; i2++) { // Iterate through the curent restaurants menus
                        insertMenu.run(data[i].menus[i2].title, i + 1) // Add the menu title to our MENUS table, i+1 is our restaurant id as we iterate through restaurants (line 13)
                        menus.push(data[i].menus[i2]); // Because atm we dont know how many menus/items we have in total we need to store them for later
                    }
                }

                // With our array of menus we can link the MENU_ITEMS' menuId to the index+1 of our menus array as now we now how many menus we have and
                // at what place are we at currently. 
                for (let i = 0; i < menus.length; i++) { // With our full list of menus and items we can iterate through them to assign it to the right place
                    for (let i2 = 0; i2 < menus[i].items.length; i2++) { // Iterate through every item within the curent menu
                        insertItem.run(i + 1, menus[i].items[i2].name, menus[i].items[i2].price)  // Store the id of the menu (position in array + 1)
                        // name (current elements .name) and price (current elements .price)
                    }
                }
            } finally {
                insertRestaurant.finalize();
                insertMenu.finalize();
                insertItem.finalize();
            }
        });
    } finally {
        db.close();
    }
}

// main flow
load()
    .then(data => {
        console.log(data);

        insert(data);
        console.log("insert complete");

})