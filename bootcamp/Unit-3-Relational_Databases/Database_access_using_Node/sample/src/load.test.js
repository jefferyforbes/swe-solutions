const sqlite3 = require('sqlite3').verbose();
const load = require('./index')

describe('SQLite3', () => {
    beforeAll(done => {
        db.exec('CREATE TABLE IF NOT EXISTS restaurants(...);', done)
    })
    test('restaurants are loaded into the database', (done) => {
        load((db) => {
            db.all('SELECT * FROM restaurants LIMIT 3;', (err, row) => {                    // db.all returns all rows
                expect(row.length).toBe(3)
                expect(row[0].name).toBe('Bayroot')
                db.get('SELECT COUNT(id) AS total FROM restaurants;', (err, count) => {     // db.get() returns the first row
                    expect(count.total).toBe(8)
                    done()
                })
            })
        })
    })
})