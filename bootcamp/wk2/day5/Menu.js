const {sequelize, Sequelize, DataTypes, Model} = require('./sequelize_index');

/**
 * Represents a Menu
 */
class Menu extends Model {

    // add methods here

}

Menu.init({
    title: DataTypes.STRING}, {
    sequelize,
    timestamps: false
});

module.exports = {Menu};

// local testing - remove when using Jest
/*(async () => {
    await sequelize.sync({ force: true });
    const m = await Menu.create({ title: 'Grill'})
    console.log("Inserted menu title is:" + m.title);
})();*/



