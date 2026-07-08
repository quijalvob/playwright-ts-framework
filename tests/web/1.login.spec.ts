import { test, expect } from '../../fixtures/pageFixtures';
import { USERS, EXPECTED_TEXT, URLS, PAGE_TITLES } from '../../data/webData';

test('Should login successfully with valid credentials', async ({ loginPage, inventoryPage }) => {
  await loginPage.navigate();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
  await expect(inventoryPage.pageTitle).toBeVisible();
  await expect(inventoryPage.pageTitle).toHaveText(PAGE_TITLES.productsTitle);
  await expect(loginPage.page).toHaveURL(URLS.inventory);
});

test('Should show error with invalid credentials', async ({ loginPage }) => {
  await loginPage.navigate();
  await loginPage.login(USERS.invalid.username, USERS.invalid.password);
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(EXPECTED_TEXT.invalidLoginError);
  await expect(loginPage.page).toHaveURL(URLS.base);
});