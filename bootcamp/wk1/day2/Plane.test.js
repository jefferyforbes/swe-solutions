const Passenger = require('./Passenger');
const Plane = require('./plane');

describe('Plane', () => {
    test('constructs', () => {
        const BA001 = new Plane('BA001');
        expect(BA001.flightNumber).toBe('BA001');
        expect(BA001.passengers).toEqual([]);
    });

    test('boards a passenger', () => {
        const BA001 = new Plane('BA001');
        const pax1 = new Passenger('fred');
        BA001.boardPassenger(pax1)
        expect(BA001.passengers).toContainEqual(pax1);
    });

    test('sets origin', () => {
        const BA001 = new Plane('BA001');
        BA001.setOrigin('LHR');
        expect(BA001.origin).toBe('LHR');
    });

    test('sets destination', () => {
        const BA001 = new Plane('BA001');
        BA001.setDestination('LAX');
        expect(BA001.destination).toBe('LAX');
    });
});
