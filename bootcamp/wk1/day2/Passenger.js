/**
 * Represents an individual who pays to fly on an aircraft.
 */
class Passenger {
    name;
    bags;
    
    /**
     * Creates a Passenger.
     * 
     * @param {string} name - the name of the passenger
     */
    constructor(name) {
        this.name = name;
        this.bags = []; // array
    }

    /**
     * Adds a bag to a passenger.
     * @param {Bag} - the passenger's bag
     */
    addBag(bag) {
        this.bags.push(bag);
    }
}

module.exports = Passenger;