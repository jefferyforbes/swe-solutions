/**
 * Represents a bag taken as either hand or cabin luggage on an aircraft
 */
class Bag {
 
    weight; // declaration not required by JS but makes
            // it more explicit that we have
            // this property in the class and more like Java!

    /**
     * Creates a Bag.
     * 
     * @param {number} weight - the weight of the bag
     */
    constructor(weight) {
        if (!weight) {
            throw new Error('bag must have a weight');
        }
        this.weight = weight;
    }
}

module.exports = Bag;
