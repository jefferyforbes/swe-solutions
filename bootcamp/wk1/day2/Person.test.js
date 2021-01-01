const Person = require('./person');

describe('Person class', () => {
    const diana = new Person('Diana', 'Spencer', []);
    const queen = new Person('Elizabeth', 'Windsor', []);
    const duke = new Person('Philip', 'Windsor', []);
    const charles = new Person('Charles', 'Windsor', [queen, duke]);
    const william = new Person('William', 'Windsor', [charles, diana]);

    test('check name', () => {
        expect(william.firstName).toEqual('William');
        expect(william.lastName).toEqual('Windsor');
    })

    test('check parents', () => {
        expect(william.childOf()).toEqual('Charles & Diana');
    })

    test('check grandparents', () => {
        expect(william.parents[0].childOf()).toEqual('Elizabeth & Philip');
    })

    test('check parents unknown', () => {
        expect(diana.childOf()).toEqual('parents unknown');
    })
})