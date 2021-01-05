/**
 * Represents an aircraft.
 */
class Plane {
    flightNumber;
    passengers;
    origin;
    destination;

    /**
     * Creates an aircraft
     * 
     * @param {string} flightNumber - the flight number e.g. BA001
     */
    constructor(flightNumber) {
        this.flightNumber = flightNumber;
        this.passengers = []; // array
    }

    /**
     * Boards a passenger onto the aircraft
     * 
     * @param {passenger} passenger 
     */
    boardPassenger(passenger) {
        this.passengers.push(passenger);
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