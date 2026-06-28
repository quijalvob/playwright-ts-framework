import { test, expect } from '../fixtures/pageFixtures';
import { USERS, EXPECTED_TEXT } from '../data/testData';

test('should login successfully with valid credentials', async ({ loginPage, inventoryPage }) => {
  await loginPage.navigate();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
  await expect(inventoryPage.pageTitle).toHaveText(EXPECTED_TEXT.productsTitle);
});

test('should show error with invalid credentials', async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.login(USERS.invalid.username, USERS.invalid.password);
  await expect(loginPage.errorMessage).toBeVisible();
});