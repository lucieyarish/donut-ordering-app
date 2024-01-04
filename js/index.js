import { menu } from './data.js';

const header = document.getElementById('header');
const menuContainer = document.getElementById('menu-container');

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
  const menuHtml = menu
    .map((item) => {
      return `
        <li>
            <div class="menu-item-container">
                <img src="${item.image}" class="menu-item-img"alt="${item.altText}">
                <div class="menu-item-description">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <h4 class="item-price">$${item.price}</h4>
                </div>
                <button class="btn-add">+</button>
            </div>
        </li>
    `;
    })
    .join('');

  menuContainer.innerHTML += menuHtml;
};

renderMenu();
