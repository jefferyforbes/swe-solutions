/**
 * Represents a Scooter for hire
 */
class Scooter {
    batteryPercentage = 0;

    /**
     * Fully charges the scooter.
     */
    charge() {
        console.log('Starting charge'); 
        
        setTimeout(function () { 
            console.log('Charge complete');  // TODO - why doesn't this log?!
            batteryPercentage = 100;
        }, 2000); // 2000ms 

        console.log(this.batteryPercentage); 
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