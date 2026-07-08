import { test, expect } from '../../fixtures/pageFixtures';
import { USERS, CART_ITEMS, EXPECTED_TEXT, PAGE_TITLES } from '../../data/webData';

test.beforeEach(async ({ loginPage, inventoryPage }) => {
  await loginPage.navigate();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
  await inventoryPage.addItemToCartByName(CART_ITEMS.bike);
  await inventoryPage.addItemToCartByName(CART_ITEMS.backPack);
  await inventoryPage.goToCart();
});

test('should display correct number of items in cart', async ({ cartPage }) => {
  await expect(cartPage.cartItemNames).toHaveCount(2);
});

test('should display correct item names in cart', async ({ cartPage }) => {
  const isBackpackInCart = await cartPage.isItemInCart(CART_ITEMS.backPack);
  const isBikeInCart = await cartPage.isItemInCart(CART_ITEMS.bike);
  expect(isBackpackInCart).toBe(true);
  expect(isBikeInCart).toBe(true);
});

test('should display correct cart page title', async ({ cartPage }) => {
  await cartPage.verifyElementText(cartPage.cartTitle, PAGE_TITLES.cartTitle);
});