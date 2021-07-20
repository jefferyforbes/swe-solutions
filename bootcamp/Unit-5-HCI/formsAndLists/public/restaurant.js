const restaurantId = document.querySelector("h2").id.split("-")[1];
const menuEl = document.getElementById("menus");
const menuSelect = document.getElementById("item-menu-select");

fetchThenRender();

async function fetchThenRender() {
  menuEl.innerHTML = null;
  menuSelect.innerHTML = null;
  const restaurant = await fetchRestaurantData();
  renderRestaurantData(restaurant);
}

async function fetchRestaurantData() {
  const response = await fetch("/restaurants/" + restaurantId);
  return await response.json();
}

function renderRestaurantData(restaurant) {
  const menuSection = document.getElementById("menus");
  for (const menu of restaurant.Menus) {
    menuSection.append(makeMenuEl(menu));
    addMenuToSelect(menu);
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

function addMenuToSelect(menu) {
  const menuOption = document.createElement("option");
  menuOption.innerText = menu.title;
  menuOption.setAttribute("value", menu.id);
  menuSelect.appendChild(menuOption);
}

function makeItemEl(item) {
  const itemEl = document.createElement("li");
  const text = `${item.name} - £${item.price}`;
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.addEventListener(
    "click",
    async () => {
      await fetch(`/items/${item.id}`, { method: "DELETE" });
      fetchThenRender();
    },
    { once: true }
  );
  itemEl.innerText = text;
  itemEl.append(deleteButton);

  return itemEl;
}

// Add menu

const addMenuForm = document.getElementById("add-menu-form");
const titleInput = document.getElementById("menu-title-input");
addMenuForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = titleInput.value;
  await fetch(`/restaurants/${restaurantId}/menus`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  titleInput.value = "";
  fetchThenRender();
});

// Add item

const addItemForm = document.getElementById("add-item-form");
const itemNameInput = document.getElementById("item-name-input");
const itemPriceInput = document.getElementById("item-price-input");
addItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const menuId = menuSelect.value;
  const name = itemNameInput.value;
  const price = itemPriceInput.value;
  await fetch(`/restaurants/${restaurantId}/menus/${menuId}/items`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });
  itemNameInput.value = "";
  itemPriceInput.value = "";
  fetchThenRender();
});
