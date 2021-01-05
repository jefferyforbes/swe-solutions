const Scooter = require('./Scooter');

describe('Scooter', function () {

    test('charge', function (done) {
        const scooter = new Scooter();
        scooter.charge(done); 
        console.log('Charge completed');  
    })

    // TODO - rest of tests to ensure 100% coverage
});