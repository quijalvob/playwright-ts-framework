export const URLS = {
  base: 'https://www.saucedemo.com/',
  inventory: 'https://www.saucedemo.com/inventory.html',
  checkoutStepTwo: 'https://www.saucedemo.com/checkout-step-two.html',
};

export const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  invalid: { username: 'invalid_user', password: 'wrong_password' },
};

export const EXPECTED_TEXT = {
  invalidLoginError: 'Epic sadface: Username and password do not match any user in this service',
  firstNameRequired: 'Error: First Name is required',
};

export const PAGE_TITLES = {
  productsTitle: 'Products',
  cartTitle: 'Your Cart',
  checkoutTitle: 'Checkout: Your Information',
  checkoutStepTwoTitle: 'Checkout: Overview',
};

export const TIMEOUTS = {
  defaultWait: 5000,
};

export const CART_ITEMS = {
  backPack: 'Sauce Labs Backpack',
  bike: 'Sauce Labs Bike Light',
};

export const CHECKOUT_INFO = {
  valid: {
    firstName: 'Bry',
    lastName: 'Q',
    zipCode: '41',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Q',
    zipCode: '41',
  },
};