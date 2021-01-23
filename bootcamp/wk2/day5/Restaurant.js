const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './restaurants-day5.sqlite'
});

/**
 * Represents a Restaurant
 */
class Restaurant extends Model {

    getName() {
        return name;
    }
}

Restaurant.init({
    name: DataTypes.STRING,
    imagelink: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'restaurant',
    timestamps: false
});

module.exports = {
    Restaurant,
    sequelize
};

// local testing - remove when using Jest
(async () => {
    const r = await Restaurant.create({ name: 'Ronalds', image: 'http://some.image.url' })
    console.log("Inserted restaurant name is:" + r.name);
})();



