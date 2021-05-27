const sqlite3 = require('sqlite3').verbose();
const populater = require('./populateDB-async');

describe('Restaurant Data Test Suite', () => {

    // TODO - add a beforeAll to initialiseDB

    test('restaurants are loaded into the database', async () => {
        return populater.load()
        .then(restaurantsArray => {
            populater.insert(restaurantsArray);
            console.log("inserts complete");
        })
        .catch(err => {
            console.error("data could not be loaded"+ err);
        })
    
    })
})