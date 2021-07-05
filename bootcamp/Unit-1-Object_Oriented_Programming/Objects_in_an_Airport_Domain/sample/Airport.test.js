const Airport = require('./Airport');
const Plane = require('./Plane');
const Passenger = require('./Passenger');
const Bag = require('./Bag');

describe('Airport', () => {
  test('has a name', () => {
    const LHR = new Airport('LHR');
    expect(LHR.name).toBe('LHR');
  });

  test('an airport has planes', () => {
    const plane1 = new Plane();
    plane1.setOrigin('LHR');
    plane1.setDestination('LAX');

    const pax1 = new Passenger({ name: 'fred' });
    const cabinLuggage = new Bag(8);
    const holdLuggage = new Bag(25);
    pax1.addBag(cabinLuggage);
    pax1.addBag(holdLuggage);

    plane1.boardPassenger(pax1);

    const LHR = new Airport('LHR');
    LHR.addPlane(plane1);

    expect(LHR.planes.length).toBe(1);

    expect(LHR.planes[0].passengers.length).toBe(1);
    expect(LHR.planes[0].passengers[0]).toMatchObject(pax1);
    expect(LHR.planes[0].passengers[0].bags[0].weight).toBe(8);
  });
});
