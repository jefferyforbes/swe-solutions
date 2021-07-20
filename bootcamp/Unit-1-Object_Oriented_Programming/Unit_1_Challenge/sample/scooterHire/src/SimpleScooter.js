class Scooter {
    batteryPercentage = 100;
    isBroken = false;

    /**
     * Constructs a new Scooter
     */
    constructor(id) {
        if (!id) {
            throw new Error('must have an id');
        }
        this.id = id;
    }

    /**
     * Reports the scooter broken
     */
    reportBroken() {
        isBroken = true
    }

    /**
     * Charges the scooter
     */
    charge() {
        if (!this.isBroken) {
            return true
        } else {
            return false
        }
    }
}

module.exports = Scooter