const sqlite3 = require('sqlite3').verbose();

/**
 * This code creates the tables for the Restaurants assignment
 */
function initialise() {
    // connect to a database named restaurants.sqlite
    const db = new sqlite3.Database('./restaurants.sqlite');

    try {
        db.serialize(function () { // serialize means execute one statement at a time

            console.log('starting database creation');

            // delete tables if they already exist
            db.run("DROP TABLE IF EXISTS RESTAURANTS");
            db.run("DROP TABLE IF EXISTS MENUS");
            db.run("DROP TABLE IF EXISTS MENU_ITEMS");

            // create new, empty tables with specific columns and column types
            db.run("CREATE TABLE RESTAURANTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imagelink TEXT)");
            db.run("CREATE TABLE MENUS (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, restaurant_id INT, FOREIGN KEY (restaurant_id) REFERENCES RESTAURANTS(id))");
            db.run("CREATE TABLE MENU_ITEMS (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, menu_id INT, FOREIGN KEY (menu_id) REFERENCES MENUS(id))");
        });
    } finally {
        // very important to always close database connections
        // else could lead to memory leaks
        db.close();
        console.log('database closed');
    }
}

// Now try calling our function
initialise();

module.exports = initialise;