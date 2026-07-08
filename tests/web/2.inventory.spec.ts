import { test, expect } from '../../fixtures/pageFixtures';
import { CART_ITEMS, USERS } from '../../data/webData';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
});

test('Should display inventory items after login', async ({ inventoryPage }) => {
  const itemCount = await inventoryPage.getItemCount();
  expect(itemCount).toBeGreaterThan(0);
});

test('Should add an item to the cart', async ({ inventoryPage }) => {
  await inventoryPage.addItemToCartByName(CART_ITEMS.bike);
  await inventoryPage.addItemToCartByName(CART_ITEMS.backPack);
});