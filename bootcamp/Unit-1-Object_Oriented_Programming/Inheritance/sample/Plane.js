const Passenger = require('./Passenger');
const CrewMember = require('./CrewMember');

/**
 * Represents an aircraft.
 */
class Plane {
    flightNumber;
    passengers;
    crewMembers;
    origin;
    destination;

    /**
     * Creates an aircraft
     * 
     * @param {string} flightNumber - the flight number e.g. BA001
     */
    constructor(flightNumber) {
        this.flightNumber = flightNumber;
        this.passengers = []; 
        this.crewMembers = []; 
    }

    /**
     * Boards a passenger onto the aircraft
     * 
     * @param {person} person 
     */
    boardPassenger(person) {
        if (person instanceof Passenger) {
            this.passengers.push(person);
        } else {
            this.crewMembers.push(person);            
        }
    }

    /**
     * Set the destination airport.
     * 
     * @param {airport} destination 
     */
    setDestination(destination) {
        this.destination = destination;
    }

    /**
     * Set the origin airport.
     * 
     * @param {airport} origin 
     */
    setOrigin(origin) {
        this.origin = origin;
    }
}

module.exports = Plane; 