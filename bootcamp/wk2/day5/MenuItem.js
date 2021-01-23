const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './restaurants-day5.sqlite'
});

/**
 * Represents a Menu
 */
class MenuItem extends Model {

    // add methods here

}

MenuItem.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'menu_item',
    timestamps: false
});

module.exports = {
    MenuItem,
    sequelize
};

// local testing - remove when using Jest
(async () => {
    const m = await MenuItem.create({ name: 'Lamb Parcels', price: 5.70})
    console.log("Inserted menu item name is:" + m.name);
})();



