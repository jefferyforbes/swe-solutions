const sqlite3 = require('sqlite3').verbose();

// use a persistent database named db.sqlite
const db = new sqlite3.Database('./restaurantdb1.sqlite');

try {
    db.serialize(function () { // serialize means execute one statement at a time

        // create the empty tables with specific columns and column types
        db.run("CREATE TABLE RESTAURANTS (id INT PRIMARY KEY, name TEXT, imagelink TEXT, menuId INT)");
        db.run("CREATE TABLE MENUS (id INT PRIMARY KEY, title TEXT, menuItem INT)");
        db.run("CREATE TABLE MENU_ITEMS (id INT PRIMARY KEY, name TEXT, price REAL)");

        let stmt;

        // insert rows
        try {
            stmt = db.prepare(`INSERT INTO RESTAURANTS VALUES (?, ?, ?, ?)`);
            stmt.run(1, 'Bayroot', 'https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/England/Brighton/brighton-restaurants-hotel-du-vin-bistro.jpg', 1);
            stmt.run(2, 'The Berkley', 'https://www.the-berkeley.co.uk/siteassets/restaurants--bars/the-garden-at-the-berkeley/the-garden-at-the-berkeley-teaser.jpg?w=620&h=560&scale=both&mode=crop', 2);
        } finally {
            // release resources 
            stmt.finalize();
        }
        try {
            stmt = db.prepare(`INSERT INTO MENUS VALUES (?, ?, ?)`);
            stmt.run(1, 'Afternoon tea', 1);
            stmt.run(2, 'Breakfast Menu', 2);
        } finally {
            // release resources 
            stmt.finalize();
        }
        try {
            stmt = db.prepare(`INSERT INTO MENU_ITEMS VALUES (?, ?, ?)`);
            stmt.run(1, 'Prêt-à-Portea', 60.00);
            stmt.run(2, 'High-Fashion Bakes and Biscuits', 70.00);
        } finally {
            // release resources 
            stmt.finalize();
        }

        // select the rows and print them out
        db.each("SELECT * FROM RESTAURANTS",
            function (err, rows) {  // this is a callback function
                console.log(rows);  // rows contains the matching rows
            }
        );
    });
} finally {
    db.close();
}