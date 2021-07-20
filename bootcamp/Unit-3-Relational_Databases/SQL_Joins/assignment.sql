.mode column
.headers on

CREATE TABLE restaurants (id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT,
                          imagelink TEXT);
insert into restaurants(name, imagelink) values ("hells kitchen", "https://www.imdb.com/title/tt0437005/");
insert into restaurants(name, imagelink) values ("wagamamas", "https://www.imdb.com/title/aaa");


CREATE TABLE menus (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                          title TEXT, restaurant_id INT, FOREIGN KEY (restaurant_id) REFERENCES restaurants(id));


insert into menus(title, restaurant_id) values ("Wines", 1);
insert into menus(title, restaurant_id) values ("A la carte", 1);
insert into menus(title, restaurant_id) values ("Evening", 2);


CREATE TABLE menuItems (id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT,
                          price INTEGER, menu_id INTEGER, FOREIGN KEY (menu_id) REFERENCES menus(id));

insert into menuItems(name,price,menu_id) values ("Salmon", 10.99, 1);
insert into menuItems(name,price,menu_id) values ("Sush", 10.99, 1);
insert into menuItems(name,price,menu_id) values ("Spring roll", 6.99, 2); 


-- SELECT all the menu items on all menus of restaurant 1
SELECT restaurants.name, menus.title, menuItems.name
FROM restaurants
JOIN menus ON restaurants.id = menus.restaurant_id
JOIN menuItems ON menus.id = menuItems.menu_id;

-- SELECT the name of each restaurant with a count of the number of menus each restaurant has
SELECT restaurants.name, count(menus.id)
FROM restaurants 
JOIN menus 
ON restaurants.id = menus.restaurant_id
GROUP BY restaurants.id;

-- SELECT all the menus, with the total cost of all the menu items summed, and have the list in descending order (most expensive first)
SELECT menus.title, sum(price) as price
FROM menus 
JOIN menuItems
ON menus.id = menuItems.menu_id
GROUP BY menus.id
ORDER BY price DESC;

