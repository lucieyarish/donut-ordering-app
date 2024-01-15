import { menu } from './data.js';
import { calculateTotal, calculateComboDiscount } from './utils.js';
import { validateInputs } from './validations.js';

const OAT_MILK_UUID = '4fb25831-6d9e-4aa0-9f29-56da3d14be63';
const CAPPUCCINO_UUID = '516ba349-3ec0-463d-b831-c2e3425d10ab';

const header = document.getElementById('header');
const mainContainer = document.getElementById('main-container');
const menuItemsContainer = document.getElementById('menu-items-container');
const cartAmountBadge = document.getElementById('cart-amount-badge');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const form = document.getElementById('card-details-form');
const infoModal = document.getElementById('info-modal');
const infoModalCloseBtn = document.getElementById('info-modal-close-btn');

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

modalCloseBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

infoModalCloseBtn.addEventListener('click', function () {
  infoModal.style.display = 'none';
});

//CART ACTIONS
const addToCart = (id) => {
  const itemToAdd = menu.find((item) => item.uuid === id);
  const checkoutBtn = document.getElementById('checkout-btn');

  const numCappuccinos = cartItems.filter(
    (item) => item.uuid === CAPPUCCINO_UUID
  ).length;

  const currentOatMilks = cartItems.filter(
    (item) => item.uuid === OAT_MILK_UUID
  ).length;

  if (itemToAdd.uuid === OAT_MILK_UUID && numCappuccinos === 0) {
    infoModal.style.display = 'block';
  } else if (
    itemToAdd.uuid === OAT_MILK_UUID &&
    currentOatMilks + 1 > numCappuccinos
  ) {
    infoModal.style.display = 'block';
  } else {
    cartItems.push(itemToAdd);
    cartItemsAmount += 1;
    cartAmountBadge.setAttribute('value', cartItemsAmount);
    if (cartItems.length === 1) {
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove('btn-disabled');
      checkoutBtn.classList.add('btn-active');
      cartAmountBadge.classList.add('cart-badge');
    }
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
    document
      .getElementById('complete-order-btn')
      .addEventListener('click', function () {
        modal.style.display = 'block';
      });
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

const renderOrderStatusMsg = () => {
  const totalContainer = document.getElementById('total-container');

  const html = `
    <div class="info-status-container">
        <p class="info-status-msg">Thanks, your order is on its way!<p>
    </div>
  `;

  totalContainer.innerHTML = html;
};

const setUpCheckoutBtn = () => {
  const checkoutBtn = createBtn();
  checkoutBtn.setAttribute('id', 'checkout-btn');
  checkoutBtn.classList.add('btn-disabled');
  checkoutBtn.disabled = true;
  checkoutBtn.innerText = 'Checkout';

  menuItemsContainer.appendChild(checkoutBtn);

  checkoutBtn.addEventListener('click', function () {
    if (!checkoutBtn.disabled) {
      menuItemsContainer.innerHTML = '';
      renderOrder(cartItems);
      renderPriceSummaryTitle();
      renderPriceSummary();
      setUpCompleteOrderBtn();
      setUpPayBtn();
    }
  });
};

const setUpPayBtn = () => {
  const payBtn = createBtn();
  payBtn.setAttribute('id', 'pay-btn');
  payBtn.setAttribute('type', 'submit');
  payBtn.classList.add('btn-active');
  payBtn.classList.add('margin-top-35');
  payBtn.innerText = 'Pay';
  form.appendChild(payBtn);

  payBtn.addEventListener('click', function () {
    const isInputsValid = validateInputs();
    if (isInputsValid) {
      renderOrderStatusMsg();
      cartAmountBadge.removeAttribute('value');
      const removeBtns = document.getElementsByClassName('btn-remove');
      Array.from(removeBtns).forEach((btn) => btn.remove());
      setTimeout(() => {
        document.getElementById('total-container').remove();
        renderMenu();
      }, 3000);
    }
  });
};

const setUpCompleteOrderBtn = () => {
  const completeOrderBtn = createBtn();
  completeOrderBtn.setAttribute('id', 'complete-order-btn');
  completeOrderBtn.classList.add('btn-active');
  completeOrderBtn.innerText = 'Complete order';
  document.getElementById('total-container').appendChild(completeOrderBtn);

  completeOrderBtn.addEventListener('click', function () {
    modal.style.display = 'block';
  });
};

const createBtn = () => {
  const btn = document.createElement('btn');
  btn.classList.add('btn-primary');

  return btn;
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

  setUpCheckoutBtn();

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
            <p class="text-bold text-size-20 total-items-text">Total price:</p>
            <p class="text-bold text-size-20 total-items-text">$${total}</p>
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

const getItemStats = () => {
  const itemStats = cartItems.reduce((accumulator, item) => {
    accumulator[item.name] = accumulator[item.name] || {
      count: 0,
      totalPrice: 0,
    };
    accumulator[item.name].count += 1;
    accumulator[item.name].totalPrice += item.price;
    return accumulator;
  }, {});

  return itemStats;
};

const renderPriceSummary = () => {
  const totalContainer = document.getElementById('total-container');
  totalContainer.innerHTML += `<div id="total-items"><div>`;

  const totalItems = document.getElementById('total-items');

  const itemStats = getItemStats();

  const totalHtml = Object.keys(itemStats)
    .map((itemName) => {
      const { count, totalPrice } = itemStats[itemName];
      return `
        <div class="total-items">
            <p class="total-items-text">${itemName}</p>
            <p class="total-items-text">x${count}</p>
            <p class="total-items-text total-items-price">$${totalPrice}</p>
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
