const sqlite3 = require('sqlite3').verbose();
const populater = require('./populateDB-sync');

describe('Restaurant Data Test Suite', () => {

    // TODO - add a beforeAll to initialiseDB

    test('restaurants are loaded into the database', async (done) => {
        let db;

        try {
            await populater();
            done();
        } finally {

        }
    })
})