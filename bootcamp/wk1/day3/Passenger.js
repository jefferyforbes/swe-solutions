const Person = require('./Person')

/**
 * Represents an individual who flies on an aircraft.
 */
class Passenger extends Person {
    ticketNumber;

    constructor(ticketNumber, name) {
        super(name);
        this.ticketNumber = ticketNumber;
    }

    callAttendant() {
        console.log('Excuse me, Hay there!')
    }
}

module.exports = Passenger;