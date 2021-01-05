/**
 * Represents a Scooter for hire
 */
class Scooter {
    batteryPercentage = 0;

    /**
     * Fully charges the scooter.
     * @param {requestCallback} callback - The callback that handles the response.
     */
    charge(callback) {
        console.log('Starting charge'); 
        setTimeout(callback, 2000); // callback will occur after timeout has complete
                                    // - we will not block
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