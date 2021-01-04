const Airport = require('./Airport');
const CrewMember = require('./CrewMember');
const Passenger = require('./Passenger');
const Plane = require('./Plane');

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

    test('boards a crew member', () => {
        const BA001 = new Plane('BA001');
        const crewMember = new CrewMember('esha');
        BA001.boardPassenger(crewMember)
        expect(BA001.crewMembers).toContainEqual(crewMember);
    });

    test('sets origin', () => {
        const BA001 = new Plane('BA001');
        const LHR = new Airport('LHR');
        BA001.setOrigin(LHR);
        expect(BA001.origin).toMatchObject(LHR);
    });

    test('sets destination', () => {
        const BA001 = new Plane('BA001');
        const LAX = new Airport('LAX');
        BA001.setDestination(LAX);
        expect(BA001.destination).toMatchObject(LAX);
    });
});
