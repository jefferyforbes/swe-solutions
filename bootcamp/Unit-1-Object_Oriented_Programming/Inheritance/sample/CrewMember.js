const Person = require('./Person');

/**
 * Represents an individual who works on an aircraft.
 */
class CrewMember extends Person {

    constructor(name) {
        super(name);
    }
}

module.exports = CrewMember;