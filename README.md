# 🍩 Delish Donuts: Donut Ordering App

## Table of contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Showcase Screenshots](#showcase-screenshots)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Time Commitment](#time-commitment)
- [Author](#author)
- [Acknowledgements](#acknowledgements)

## Overview

This project was built while learning essential HTML, CSS and JavaScript concepts through Scrimba's [Frontend Career Path courses](https://scrimba.com/learn/frontend).

The Figma mockup was provided by Scrimba and redesigned by me. The app was originally supposed to be a Restaurant Ordering App, but students are always engouraged to change the theme and make it their own.

The app was built entirely from scratch by me.

### The Challenge

#### Basic Requirements

- Follow the design spec
- Render the menu options using JS
- Add items feature
- Remove items feature
- Have a payment modal with compulsory form inputs

#### Stretch Goals

- Offer a “meal deal” discount — If food & drink are bought together, offer e.g. 15% discount
- Allow users to rate their experience (e.g. 1-5 clickable stars)
- Change the theme

### Showcase Screenshots

##### Mobile

##### Tablet

##### Desktop

### Links
- Live URL: https://delish-donuts-lucieyarish.netlify.app/

## My Process

1. Generate AI images of donuts for the app
2. Redesign the Figma mockup
3. Task breakdown
4. Create GitHub repo & README
5. Create project folder structure
6. Build the header with logo
7. Render menu items with vegan badges if applicable
8. Create add to cart button
9. Add to cart feature
10. Prevent user from adding free oat milk into cart if no coffee present
11. Create checkout button - only enabled if there's at least one item in cart
12. Render all cart items after checkout btn clicked
13. Calculate and render total price
14. Apply combo discount if at least one drink-donut pair present
15. Remove from cart feature
16. Complete order button
17. Complete payment modal component
18. Add extensive custom validations
19. Make app responsive by creating tablet & desktop version
20. Render order status after payment completions
21. Remove buttons after order being completed
22. Add `setTimeout()` that automaticaly empties the cart and renders menu after order being completed
23. Add favicon
24. Submit for code review
25. Implement changes suggested by the mentor & do bugfixing
26. Update GitHub README

### Built With

HTML, CSS & Vanilla JS

### What I Learned
- Asking for help is normal when one gets stuck. I got a great help on one of my bugs from one of the Scrimba bootcamp mentors and also got awesome suggestions from them along the way!
- Do more `console.log`ging when debugging!
- Avoid rendering HTML with JavaScript when you can. Rendering too much HTML with JS can affect performance!
- I learned about the existence of the `dialog` HTML element that can be manipulated with `showModal()` and `close()` functions in JS
- Generate random UUIDs with `crypto.randomUUID()`

### Continued Development
I really enjoyed building this project and I think I'm going to try rebuilding it with React soon! 

In Delish Donuts 2.0, I am planning to keep the existing features, as well as implementing new ones:
- Increment arrows to allow users adjust the amount of items of the same kind in cart both in the menu and order summary
- Create footer with contact information
- Only apply 15% discount per each donut-drink pair
- Format card numbers on the fly (add spaces between each 4 numbers)
- Create banner advertising the donut-drink combo discount
- Make cart icon always visible (in fixed position) & clickable (render order on click) 

### Time Commitment
The project took me a little under 17 hours to build. Fixes after code review, testing, deployment and GitHub README update took another 3 hours. TOTAL: 20 hours

## Author

- Linkedin: https://www.linkedin.com/in/lucie-yarish/
- Hashnode: https://lucieyarish.hashnode.dev/
- Instagram: https://www.instagram.com/luciecodes/

## Acknowledgements

Thank you, Scrimba, for the fantastic challenge! Looking forward to more projects and continued growth in the vast world of frontend development! 🌐✨
