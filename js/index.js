import { menu } from './data.js';

const header = document.getElementById('header');
const menuContainer = document.getElementById('menu-container');
const checkoutBtn = document.getElementById('btn-checkout');

const cartItems = [];

const renderHeader = () => {
  const headerHtml = `
        <div class="header-background">
            <h1 class="logo-title">Delish donuts</h1>
            <h3 class="logo-subtitle">The best donuts in town.</h3>
        </div>
    `;

  header.innerHTML = headerHtml;
};

renderHeader();

const renderMenu = () => {
  const badgePath = '../assets/images/vegan-badge.png';
  const veganBadge = `<img src="${badgePath}" class="badge-img">`;
  const menuHtml = menu
    .map((item) => {
      const ingredients = item.ingredients.join(', ');
      return `
        <li >
            <div class="menu-item-container">
                <img src="${item.image}" class="menu-item-img"alt="${
        item.altText
      }">
                <div class="menu-item-description">
                    <h3 class="item-name">${item.name}
                    <span>${item.isVegan ? veganBadge : ''}</span>
                    </h3>
                    <p class="item-ingredients">${ingredients}</p>
                    <h4 class="item-price">$${item.price}</h4>
                </div>
                <button id="${item.uuid}" class="btn-add">+</button>
            </div>
        </li>
    `;
    })
    .join('');

  menuContainer.innerHTML += menuHtml;
};

renderMenu();

menuContainer.addEventListener('click', function (e) {
  if (e.target.id) {
    const itemToAdd = menu.find((i) => i.uuid === e.target.id);
    cartItems.push(itemToAdd);
    //TODO: only perform these 3 steps after amount of cartItems changes from 0 to 1
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('btn-disabled');
    checkoutBtn.classList.add('btn-active');
  }
});
