/**
 * Represents a bag taken as either hand or cabin luggage on an aircraft
 */
class Bag {
    /**
     * Creates a Bag.
     * 
     * @param {string} weight - the weight of the bag
     */
    constructor(weight) {
        if (null == weight) {
            throw new Error('bag must have a weight');
        }
        this.weight = weight;
    }
}

module.exports = Bag;
