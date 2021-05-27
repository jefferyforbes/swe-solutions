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

        // loop through the restaurantsArray to get hold of the list of restaurants
        for (let i = 0; i < restaurantsArray.length; i++) {
            const currentRestaurant = restaurantsArray[i];

            console.log('-------------------------'); 
            console.log(currentRestaurant.name); // print name of each restaurant

            // loop through the menus associated with the restaurant
            for (let j = 0; j < currentRestaurant.menus.length; j++) {
                const currentMenu = currentRestaurant.menus[j];
                console.log(currentMenu.title);   // print title of each menu

                for (let k = 0; k < currentMenu.items.length; k++) {
                    const currentMenuItem = currentMenu.items[k];
                    console.log(currentMenuItem.name);   // print name of each menu item
                }
            }
        }
    } catch (error) {
        // if we get here, our file read has filed
        console.error('problem reading the file');
    }
}

// main flow
loadAndPrint();