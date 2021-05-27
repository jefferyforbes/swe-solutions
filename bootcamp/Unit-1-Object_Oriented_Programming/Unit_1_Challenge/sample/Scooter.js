/**
 * Represents a Scooter for hire
 */
class Scooter {
    batteryPercentage = 0;

    /**
     * Fully charges the scooter using non-blocking calls.
     * @param {requestCallback} callback - The callback that handles the response.
     */
    chargeWithoutBlocking(callback) {
        console.log('1. Starting charge'); 

        setTimeout(callback, 2000); // callback will executed after timer has completed

        console.log('2. Waiting for charge to complete'); // in the meantime, print this              
    }

    /**
     * Fully charges the scooter in an async function using blocking calls.
     */
    async chargeAndBlock() {                              // if we use 'await', the method must be marked as 'async'
                                                          // async functions return a Promise
        console.log('1. Starting charge'); 

        await new Promise(resolve => setTimeout(resolve, 2000)); // await suspends the function (not the caller)
                                                                 // await has to wait for a Promise to settle
                                                                 // a Promise represents the eventual completion 
                                                                 // of an async operation

        console.log('2. Charge complete');   // this line will print only once the promise is settled
    }

    /**
     * Hires the scooter.
     */
    hire() {
        if (this.batteryPercentage!=100) {
            console.log('Scooter needs charging, please try again later');
            this.charge();
        } else {
            console.log('Enjoy your trip');
        }
    }

    /**
     * Returns the scooter.
     */
    returnIt() {
        this.batteryPercentage = 0;
        console.log('Thanks for your custom - see you again soon!');
    }
}


module.exports = Scooter;


// scratch pad for testing blocking function
/*
const scooter = new Scooter();
scooter.chargeWithoutBlocking(function() {
    console.log('2. Charge complete');                     
});
console.log('Waiting for scooter to charge');   */

// scratch pad for testing non-blocking function
/*
const scooter = new Scooter();
scooter.chargeAndBlock();
console.log('Waiting for scooter to charge');   // note that this line will be printed BEFORE the charge is complete
*/


