const fsp = require('fs').promises; // Node.js file system module with promises

/**
 * This code illustrates how to load JSON data into an array.
 * 
 */
async function loadAndPrint() {
    // wait for the json file to be read
    try {
        const rawData = await fsp.readFile('./restaurants.json');

        // convert the file data into JS objects (arrays)
        const restaurantsArray = (JSON.parse(String(rawData)));
        console.log("array is length:"+restaurantsArray.length);
        console.log("array is:"+restaurantsArray);

        for (i=0; i<restaurantsArray.length; i++) {
            console.log(restaurantsArray[i].name);
        }

    } catch (error) {
        // if we get here, our file read has filed
        console.error('problem reading the file');
    }
}

// main flow
loadAndPrint();