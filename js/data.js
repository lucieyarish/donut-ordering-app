export const menu = [
  {
    uuid: crypto.randomUUID(),
    image: 'assets/images/strawberry-donut.png',
    name: 'Strawberry Milkshake Donut',
    altText: 'Digital art donut with pink frosting and strawberries on top',
    ingredients: ['fresh strawberries', 'strawberry buttercream frosting'],
    price: 7,
    isVegan: false,
    isFood: true,
    slug: 'strawberry-milkshake-donut',
  },
  {
    uuid: crypto.randomUUID(),
    image: 'assets/images/caramel-peanut-donut.png',
    name: 'Peanut Caramel Donut',
    altText:
      'Digital art donut with light brown frosting and chopped peanuts on top surrounded by many tiny donuts with no frosting',
    ingredients: ['peanuts', 'vegan caramel frosting'],
    price: 7,
    isVegan: true,
    isFood: true,
    slug: 'caramel-peanut-donut',
  },
  {
    uuid: crypto.randomUUID(),
    image: 'assets/images/blueberry-donut.png',
    name: 'Blueberry Donut',
    altText:
      'Digital art donut with blue frosting, blueberries and petals on top, standing on its side at a beach',
    ingredients: ['fresh blueberries', 'vegan blueberry frosting'],
    price: 7,
    isVegan: true,
    isFood: true,
    slug: 'blueberry-donut',
  },
  {
    uuid: crypto.randomUUID(),
    image: 'assets/images/cappuccino-cup.png',
    name: 'Cappuccino',
    altText:
      'Digital art cup of cappuccino with beautiful latte art standing on a wooden table with exotic flowers in the background',
    ingredients: ['espresso', 'steamed milk', 'foam'],
    price: 5,
    isVegan: false,
    isFood: false,
    slug: 'cappuccino',
  },
  {
    uuid: crypto.randomUUID(),
    image: 'assets/images/oat-milk.png',
    name: 'Oat Milk',
    altText:
      'Digital art box of oat milk and a glass full of it in the foreground standing on a kitchen counter',
    ingredients: ['plant-based oat milk for your coffee'],
    price: 0,
    isVegan: true,
    isFood: false,
    slug: 'oat-milk',
  },
];
