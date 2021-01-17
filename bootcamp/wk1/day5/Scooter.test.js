const Scooter = require('./Scooter');

describe('Scooter', function () {

    test('charge without blocking', (done) => {
        const scooter = new Scooter();
        scooter.chargeWithoutBlocking((err, info) => {
            console.log("3. Charge complete");
            done();
        })
        // note any code here will still be executed whilst waiting for timer
    })

    test('charge and block', async () => {
        const scooter = new Scooter();
        await scooter.chargeAndBlock(); // we need to wait for the charge!
        console.log("Test complete");
    })


    // TODO - rest of tests to ensure 100% coverage
});