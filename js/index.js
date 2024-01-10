import { menu } from './data.js';
import { calculateTotal, calculateComboDiscount } from './util-functions.js';

const header = document.getElementById('header');
const mainContainer = document.getElementById('main-container');
const menuItemsContainer = document.getElementById('menu-items-container');
const cartAmountBadge = document.getElementById('cart-amount-badge');

const badgePath = '../assets/images/vegan-badge.png';
const veganBadge = `<img src="${badgePath}" class="badge-img">`;

const cartItems = [];
let cartItemsAmount = 0;

// EVENT LISTENERS
const handleCartButtonClick = (e) => {
  if (e.target.classList.contains('btn-remove') && e.target.dataset.index) {
    removeFromCart(e.target.dataset.index);
  } else if (e.target.classList.contains('btn-cart') && e.target.id) {
    addToCart(e.target.id);
  }
};

//CART ACTIONS
const addToCart = (id) => {
  const itemToAdd = menu.find((item) => item.uuid === id);
  const checkoutBtn = document.getElementById('checkout-btn');
  cartItems.push(itemToAdd);
  cartItemsAmount += 1;
  cartAmountBadge.setAttribute('value', cartItemsAmount);
  if (cartItems.length === 1) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('btn-disabled');
    checkoutBtn.classList.add('btn-active');
    cartAmountBadge.classList.add('cart-badge');
  }
};

const removeFromCart = (index) => {
  cartItems.splice(index, 1);
  cartItemsAmount -= 1;
  cartAmountBadge.setAttribute('value', cartItemsAmount);

  if (!cartItems.length) {
    clearCart();
    cartAmountBadge.classList.remove('cart-badge');
  } else {
    renderOrder(cartItems);
    renderPriceSummary();
  }
};

const clearCart = () => {
  menuItemsContainer.removeEventListener('click', handleCartButtonClick);

  if (document.getElementById('total-container')) {
    document.getElementById('total-container').remove();
  }

  renderMenu();
};

// RENDERING FUNCTIONS
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

const createCheckoutBtn = () => {
  const checkoutBtn = document.createElement('btn');
  checkoutBtn.setAttribute('id', 'checkout-btn');
  checkoutBtn.classList.add('btn-primary');
  checkoutBtn.classList.add('btn-disabled');
  checkoutBtn.disabled = true;
  checkoutBtn.innerText = 'Checkout';

  checkoutBtn.addEventListener('click', function () {
    if (!checkoutBtn.disabled) {
      menuItemsContainer.innerHTML = '';
      renderOrder(cartItems);
      renderPriceSummaryTitle();
      renderPriceSummary();
    }
  });

  return checkoutBtn;
};

const renderMenu = () => {
  menuItemsContainer.innerHTML = '';
  const menuHtml = menu
    .map((item) => {
      const ingredients = item.ingredients.join(', ');
      return `
        <li >
            <div class="menu-item-container border-bottom-grey">
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
                <button id="${item.uuid}" class="btn-cart">+</button>
            </div>
        </li>
    `;
    })
    .join('');

  menuItemsContainer.innerHTML += menuHtml;

  const checkoutBtn = createCheckoutBtn();
  menuItemsContainer.appendChild(checkoutBtn);

  menuItemsContainer.addEventListener('click', handleCartButtonClick);
};

renderMenu();

const renderComboDiscountInfo = () => {
  return `
        <div class="combo-discount-container border-top-grey">
            <p>Donut + drink combo discount</p>
            <p>-15%</p>
        </div>
    `;
};

const renderTotal = (total) => {
  return `
        <div class="total-price-container border-top-black">
            <p class="text-bold text-size-20">Total price:</p>
            <p class="text-bold text-size-20">$${total}</p>
        </div>
    `;
};

const renderPriceSummaryTitle = () => {
  const totalContainer = document.createElement('section');
  totalContainer.classList.add('total-container');
  totalContainer.setAttribute('id', 'total-container');
  mainContainer.appendChild(totalContainer);
  totalContainer.innerHTML = `
          <h2 class="section-title border-top-grey padding-top-24">Your order</h2>
    `;
};

const renderPriceSummary = () => {
  const totalContainer = document.getElementById('total-container');
  totalContainer.innerHTML += `<div id="total-items"><div>`;

  const totalItems = document.getElementById('total-items');

  const totalHtml = cartItems
    .map((item) => {
      return `
        <div class="total-items">
            <p>${item.name}</p>
            <p>$${item.price}</p>
        </div>
      `;
    })
    .join('');

  totalItems.innerHTML = totalHtml;

  const isCombo =
    cartItems.some((i) => i.isFood) &&
    cartItems.some((i) => !i.isFood && i.price !== 0);

  const total = calculateTotal(cartItems);
  let discountedTotal = 0;

  if (isCombo) {
    //TODO: Only apply -15% per drink-donut pair
    //Find all drink-donut pairs in cartItems
    //Get total of all pairs & apply -15%
    //Add total price of remaining items
    discountedTotal = calculateComboDiscount(total);

    totalItems.innerHTML += renderComboDiscountInfo();
  }

  if (discountedTotal > 0) {
    totalItems.innerHTML += renderTotal(discountedTotal);
  } else {
    totalItems.innerHTML += renderTotal(total);
  }
};

const renderOrder = (items) => {
  menuItemsContainer.innerHTML = '';
  const orderHtml = items
    .map((item, index) => {
      const ingredients = item.ingredients.join(', ');
      return `
        <li >
            <div class="menu-item-container border-hidden">
                <img 
                    src="${item.image}" 
                    class="menu-item-img"
                    alt="${item.altText}">
                <div class="menu-item-description">
                    <h3 class="item-name">${item.name}
                    <span>${item.isVegan ? veganBadge : ''}</span>
                    </h3>
                    <p class="item-ingredients">${ingredients}</p>
                    <h4 class="item-price">$${item.price}</h4>
                </div>
                <button data-index="${index}" id="${
        item.uuid
      }" class="btn-cart btn-remove">-</button>
            </div>
        </li>
    `;
    })
    .join('');

  menuItemsContainer.innerHTML += orderHtml;
};
