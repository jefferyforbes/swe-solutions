const Person = require('./Person')

/**
 * Represents an individual who flies on an aircraft.
 */
class Passenger extends Person {
    constructor(name) {
        super(name);
    }

    callAttendant() {
        console.log('Excuse me, Hay there!')
    }
}

module.exports = Passenger;