const restaurantId = document.querySelector("h1").id.split("-")[1];
fetch("/restaurants/" + restaurantId)
    .then((res) => res.json())
    .then(renderRestaurantData);

function renderRestaurantData(restaurant) {
    const menuSection = document.getElementById("menus");
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
        menuEl.append(makeItemEl(item));
    }
    return menuEl;
}

function makeItemEl(item) {
    const itemEl = document.createElement("li");
    const text = `${item.name} - £${item.price}`;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener(
        "click",
        async () => {
            itemEl.remove();
            await fetch(`/items/${item.id}`, { method: "DELETE" });
            // in a real app, you'd show a loading spinner whilst waiting
        },
        { once: true } // removes itself after first use
    );
    itemEl.innerText = text;
    itemEl.append(deleteButton);

    return itemEl;
}

// todo add delete button
