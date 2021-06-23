const restaurantId = document.querySelector('h1').id.split('-')[1];
fetch('/restaurants/' + restaurantId)
    .then(res => res.json())
    .then(renderRestaurantData);

function renderRestaurantData(restaurant) {
    const menuSection = document.getElementById('menus');
    for (const menu of restaurant.Menus) {
        menuSection.append(makeMenuEl(menu));
    }
}

function makeMenuEl(menu) {
    const menuEl = document.createElement("ul");
    const menuTitle = document.createElement("h3");
    menuTitle.innerText = menu.title;
    menuEl.append(menuTitle);
    for (const item of menu.MenuItems) {
        menuEl.append(makeItemEl(item))
    }
    return menuEl;
}

function makeItemEl(item) {
    const itemEl = document.createElement("li");
    const text = `${item.name} - £${item.price}`;
    itemEl.innerText = text;
    return itemEl;
}

// todo add delete button