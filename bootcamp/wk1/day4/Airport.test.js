const Airport = require('./Airport');
const Plane = require('./Plane');
const Passenger = require('./Passenger');
const Bag = require('./Bag');
const fsp = require('fs').promises; 
const fs = require('fs'); 
const { doesNotMatch, fail } = require('assert');

describe('Airport', () => {

    // clean up before each test
    beforeEach(() => {
        const airports = Airport.airports;
        while (airports.length) {
            airports.pop();
          }
      });

    
    test('has a name, terminal and gates', () => {
        // given
        const LHR = new Airport('LHR', 2, 3);

        // then
        expect(LHR.name).toBe('LHR');
        expect(LHR.terminals).toBe(2);
        expect(LHR.gates).toBe(3);
    });

    test('each airport knows about all the others', () => {
        // given
        const LAX = new Airport('LAX');

        // then
        expect(Airport.airports).toBeTruthy();
        expect(Airport.airports.length).toBe(1);
    });

    test('an airport has planes', () => {
        // given
        const LHR = new Airport('LHR');
        const LAX = new Airport('LAX');

        const plane1 = new Plane();
        plane1.setOrigin('LHR');
        plane1.setDestination('LAX');

        const pax1 = new Passenger({name: "fred"});

        const cabinLuggage = new Bag(8);
        const holdLuggage = new Bag(25);
        pax1.addBag(cabinLuggage);
        pax1.addBag(holdLuggage);

        plane1.boardPassenger(pax1);

        // when
        LHR.addPlane(plane1);

        // then
        expect(plane1.origin).toBe('LHR');
        expect(LHR.planes.length).toBe(1);
        expect(plane1.passengers.length).toBe(1);
        expect(plane1.passengers[0]).toMatchObject(pax1);
        expect(plane1.passengers[0].bags[0].weight).toBe(8);
    });

    test('takeOff', () => {
        // given
        const LHR = new Airport('LHR');
        const LAX = new Airport('LAX');

        const plane1 = new Plane();
        plane1.setOrigin('LHR');
        plane1.setDestination('LAX');
        LHR.addPlane(plane1);

        // when
        LHR.takeOff(plane1);

        // then
        expect(LHR.planes.length).toBe(0);
        expect(LAX.planes.length).toBe(1);
        expect(LAX.planes[0]).toMatchObject(plane1); 
    });

    test('land', () => {
        // given
        const LHR = new Airport('LHR');
        const LAX = new Airport('LAX');
        const plane1 = new Plane();
        plane1.setOrigin('LHR');
        plane1.setDestination('LAX');
        LHR.addPlane(plane1);
        LHR.takeOff(plane1);

        // when
        LAX.land(plane1);

        // then
        expect(LAX.planes.length).toBe(0);
    });

    test('getInfo_withCallback', () => { 
        // given
        const LHR = new Airport('LHR');

        // when
        LHR.getInfo_withCallback((err, info) => {
            // then
            expect(info.city).toBe('London');
        })
    });

    test('getInfo_withPromise', () => {
        const CDG = new Airport('CDG')
        return CDG.getInfo_withPromise()
            .then(info => {
                expect(info.city).toEqual('Paris')
            })
            .catch(err => {
                expect(err).toBeNull()
            })
    })

    test('getInfo_withAwait', async () => { // indicates a Promise is being returned
        // given
        const LHR = new Airport('LHR');

        // when
        const info = await LHR.getInfo_withAwait(); // TODO - confused with why await marked as not necessary!!
        
        // then
        expect(info.city).toBe('London');
    });

    test('getInfo_withPromise error', () => { // indicates a Promise is being returned
        // given
        const LHR = new Airport('LHR');

        // @ts-ignore
        jest.spyOn(fs, 'readFile').mockImplementation((path, options, callback) => {
            throw new Error('read file failed');
        });

        // when
        LHR.getInfo_withPromise()
        .then(info => {
            fail();
        })
        .catch(err => {
            // then
            expect('read file failed' === error.message);
        });
    });

    test('getInfo_withAwait error', async () => { // indicates a Promise is being returned
        // given
        const LHR = new Airport('LHR');

        let readFileCallback;
        // @ts-ignore
        jest.spyOn(fsp, 'readFile').mockImplementation((path, options, callback) => {
            throw new Error('read file failed');
        });

        // when
        try {
            const info = await LHR.getInfo_withAwait(); 
            fail();
        } catch (error) {
            // then
            expect('read file failed' === error.message);
        }
    });
});