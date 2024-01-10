export const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, currentItem) => total + currentItem.price, 0);
};

export const calculateComboDiscount = (total) => {
  const discountedTotal = total - (total / 100) * 15;

  return discountedTotal;
};
