/**
 * Represents an individual who flies on an aircraft.
 */
class Person {
    name;
    bags;
    
    /**
     * Creates a Person.
     * 
     * @param {string} name - the name of the person
     */
    constructor(name) {
        this.name = name;
        this.bags = []; // array
    }

    /**
     * Adds a bag to a person.
     * @param {Bag} - the person's bag
     */
    addBag(bag) {
        this.bags.push(bag);
    }
}

module.exports = Person;