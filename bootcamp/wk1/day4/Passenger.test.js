const Bag = require('./Bag')
const Passenger = require('./Passenger')

describe('Passenger', function () {
    test('has a name', function () {
        const person = new Passenger('Bernard');
        expect(person.name).toEqual("Bernard");
    })

    test('has bags', () => {
        const person = new Passenger({name: "Yuki"})
        const handluggage = new Bag(8)
        const hullluggage = new Bag(25)
        person.addBag(handluggage)
        person.addBag(hullluggage)
        expect(person.bags.length).toBe(2)
    })

    test('we can read the weight of a bag', () => {
        const poppy = new Passenger({name: 'Poppy'})
        const rucksac = new Bag(6)
        poppy.addBag(rucksac)
        expect(poppy.bags[0].weight).toBe(6)
    })

    test('instanceof', () => {
        const pax1 = new Passenger({name: 'Poppy'})
        expect(pax1 instanceof Passenger).toBeTruthy;
    })

    test('callAttendant', () => {
        const pax1 = new Passenger({name: 'Poppy'});
        console.log = jest.fn();

        pax1.callAttendant();
        expect(console.log).toHaveBeenCalledWith("Excuse me, Hay there!");
    })
})