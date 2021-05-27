const Person = require('./Person');

/**
 * Represents an individual who works on an aircraft.
 */
class CrewMember extends Passenger {


    constructor() {
        super('00000');
    }

}

module.exports = CrewMember;