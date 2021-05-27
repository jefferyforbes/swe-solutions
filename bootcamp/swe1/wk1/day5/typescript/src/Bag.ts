/**
 * Represents a bag taken as either hand or cabin luggage on an aircraft
 */
class Bag {
 
    private weight:number; // kg

    constructor(weight:number) {
        if (!weight) {
            throw new Error('bag must have a weight');
        }
        this.weight = weight;
    }

    public getWeight():number { 
        return this.weight*1000; // return it in grams
    }
}

export = Bag;

const bag = new Bag(20);
console.log(bag.getWeight());


//console.log(bag.getWeight());
