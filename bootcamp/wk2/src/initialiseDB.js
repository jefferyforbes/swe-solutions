const sqlite3 = require('sqlite3').verbose();

// use a persistent database named db.sqlite
const db = new sqlite3.Database('./restaurants.sqlite');

try {
    db.serialize(function () { // serialize means execute one statement at a time

        db.run("DROP TABLE IF EXISTS RESTAURANTS");
        db.run("DROP TABLE IF EXISTS MENUS");
        db.run("DROP TABLE IF EXISTS MENU_ITEMS");

        // create the empty tables with specific columns and column types
        db.run("CREATE TABLE RESTAURANTS (id INT PRIMARY KEY, name TEXT, imagelink TEXT)");
        db.run("CREATE TABLE MENUS (id INT PRIMARY KEY, title TEXT, restaurant_id INT, FOREIGN KEY (restaurant_id) REFERENCES RESTAURANTS(id))");
        db.run("CREATE TABLE MENU_ITEMS (id INT PRIMARY KEY, name TEXT, price REAL, menu_id INT, FOREIGN KEY (menu_id) REFERENCES MENUS(id))");
    });
} finally {
    db.close();
}