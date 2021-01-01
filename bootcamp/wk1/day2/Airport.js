const fs = require('fs').promises; // Node.js file system module with promises
const path = require('path'); // Node.js directories and file paths module

/**
 * Represents an airport.
 */
class Airport {
    // instance
    name = '';
    terminals = 1;
    gates = 1;
    plane_capacity = 12;
    planes = []; // incoming planes

    /**
     * Constructs an airport.
     * 
     * @param {string} name 
     * @param {number} terminals 
     * @param {number} gates 
     */
    constructor(name, terminals, gates) {
        if (name != undefined) {
            this.name = name
        }
        if (terminals != undefined) {
            this.terminals = terminals
        }
        if (gates != undefined) {
            this.gates = gates
        }
        this.plane_capacity = terminals*gates;
    }

    /**
     * Adds an incoming plane to the airport
     * 
     * @param {plane} plane 
     */
    addPlane(plane) {
        plane.setOrigin(this.name)
        this.planes.push(plane)
    }

    /**
     * Removes a landed plane from the airport.
     * 
     * @param {plane} plane - The plane to remove
     */
    removePlane(plane) {
        const index = this.planes.indexOf(plane);
        this.planes.splice(index, 1);
    }

}

module.exports = Airport