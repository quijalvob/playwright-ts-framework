import { test, expect } from '../fixtures/pageFixtures';
import { USERS } from '../data/testData';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
});

// test('should display inventory items after login', async ({ inventoryPage }) => {
//   const itemCount = await inventoryPage.getItemCount();
//   expect(itemCount).toBeGreaterThan(0);
// });

// test('should add an item to the cart', async ({ inventoryPage }) => {
//   await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
//   await inventoryPage.goToCart();
// });