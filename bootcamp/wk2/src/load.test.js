const sqlite3 = require('sqlite3').verbose();
const initialiser = require('./initialiseDB');
//const db = require('./populateDB')

describe('SQLite3', () => {
    beforeAll(done => {
        initialiser.initialise();
    });
    
    test('restaurants are loaded into the database', () => {
        console.log("hi");
        /*const db = new sqlite3.Database('./testLoad.sqlite');

        load((db) => {
            db.get('SELECT COUNT(id) AS total FROM RESTAURANTS;', (err, row) => {
                  expect(count.total).toBe(28868)
                  done()
                })
            })*/
    })
})