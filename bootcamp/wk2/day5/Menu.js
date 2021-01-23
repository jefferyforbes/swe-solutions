const { Sequelize, DataTypes, Model } = require('sequelize');
const Restaurant = require ('./Restaurant');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './restaurants-day5.sqlite'
});

/**
 * Represents a Menu
 */
class Menu extends Model {

    // add methods here

}

Menu.init({
    title: DataTypes.STRING,
    imagelink: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false
});

//Menu.belongsTo(Restaurant, {foreignKey: 'restaurant_id'});


module.exports = {Menu, sequelize};

// local testing - remove when using Jest
(async () => {
    const m = await Menu.create({ title: 'Grill'})
    console.log("Inserted menu title is:" + m.title);
})();



