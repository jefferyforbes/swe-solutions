const fsp = require('fs').promises; // Node.js file system module with promises
const fs = require('fs'); // Node.js file system module for standard callbacks
const path = require('path'); // Node.js directories and file paths module
const Passenger = require('./Passenger');

/**
 * Represents an airport.
 */
class Airport {
    static airports = [];
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
        this.name = name;

        if (terminals != undefined) {
            this.terminals = terminals;
        }
        if (gates != undefined) {
            this.gates = gates;
        }
        this.plane_capacity = terminals*gates;
        this.constructor.airports.push(this); // this syntax allows us to refer to the static Airport (i.e. the class)
    }

    /**
     * Adds an incoming plane to the airport
     * 
     * @param {plane} plane 
     */
    addPlane(plane) {
        plane.setOrigin(this.name);
        this.planes.push(plane);
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

    /**
     * Takeoff from an origin airport towards the destination airport.
     * 
     * @param {plane} plane 
     */
    takeOff(plane) {
        const index = this.planes.indexOf(plane);
        this.planes.splice(index, 1);
        const destinationAirport = Airport.airports.find(
            airport => {   
                return airport.name === plane.destination;
            });

        destinationAirport.addPlane(plane)
    }

    /**
     * Land at the destination airport.
     * 
     * @param {plane} plane - The plane which has just landed.
     */
    land(plane) {
        this.removePlane(plane);       
    }

    /**
     * Return complete information about this airport using a callback function.
     * 
     * @param {requestCallback} cb - The callback that handles the response.
     */
    getInfo_withCallback(cb) {
        const airportName = this.name;
        const airportDataFile = path.join(__dirname, 'airportsData.json');

        // asynchronously read the content of the airport data file
        fs.readFile(airportDataFile, (err, data) => {
            // read the contents into an array
            const airports =  JSON.parse(data);
            // locate the information for this airport
            const airport = airports.find(airport => airport.iata === airportName);
            cb(err, airport);
        });
    }

    /**
     * Return complete information about this airport using Promises.
     * Note that it is possible to use the fs.promises API as an alternative to creating
     * Promises by hand.
     * 
     * @returns {Promise<string[]>} Complete information about this airport
     */
    getInfo_withPromise() {
        const airportName = this.name;
        const airportDataFile = path.join(__dirname, 'airportsData.json');

        return new Promise((resolve, reject) => {
            fs.readFile(airportDataFile, (err, data) => { // TODO - could use fs promises API instead
                if (err) {
                    return reject(err);
                }
                
                const airports = JSON.parse(String(data));
                const airport = airports.find(airport => airport.iata === airportName);
                
                resolve(airport);
            });
        });
    };

    /**
     * Return complete information about this airport using async await.
     * 
     * @returns {Promise<string[]>} Complete information about this airport
     */
     async getInfo_withAwait() {
        const airportName = this.name;
        const airportDataFile = path.join(__dirname, 'airportsData.json');

        try {
            // asynchronously read the content of the airport data file
            const buffer = await fsp.readFile(airportDataFile); 
            // read the contents into an array
            const airports =  JSON.parse(String(buffer));
            // locate the information for this airport
            const airport = airports.find(airport => airport.iata === airportName);
            return airport;               
        } catch (err) { // TODO - is this needed?
            console.log(err); 
            throw err;
        }
    }
}

module.exports = Airport