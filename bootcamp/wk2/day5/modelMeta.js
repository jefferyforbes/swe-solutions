const sequelize = require('./sequelize_index').sequelize;
// Import all the classes in our ORM
const Restaurant = require('./Restaurant');
const Menu = require('./Menu');
const MenuItems = require('./MenuItem');

// specify relationships between classes
//Restaurant.hasMany(Menu, { foreignKey: 'menu_id' });
//Menu.belongsTo(Restaurant, { as: 'owner', foreignKey: 'menu_id' });

module.exports = {Restaurant, Menu, MenuItems, sequelize}
