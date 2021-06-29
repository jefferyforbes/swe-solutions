
const people = require('./Person') // need to import any objects/classes we need for this test

describe('Family tree test suite', () => { // test suite

    test('williams mother', () => { // single test
        expect(people.william.firstName).toEqual("William")
    })


})