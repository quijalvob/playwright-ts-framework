import { test, expect } from '../../fixtures/pageFixtures';
import { USERS, CART_ITEMS, CHECKOUT_INFO, PAGE_TITLES, EXPECTED_TEXT, URLS } from '../../data/webData';

test.describe('Checkout Step One', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.addItemToCartByName(CART_ITEMS.backPack);
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
  });

  test('should display checkout page title', async ({ checkoutPage }) => {
    await checkoutPage.verifyElementText(checkoutPage.checkoutTitle, PAGE_TITLES.checkoutTitle);
  });

  test('should fill checkout info and continue', async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_INFO.valid.firstName,
      CHECKOUT_INFO.valid.lastName,
      CHECKOUT_INFO.valid.zipCode
    );
    await checkoutPage.clickContinue();
    await expect(checkoutPage.page).toHaveURL(/checkout-step-two/);
  });

  test('should show error when first name is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_INFO.missingFirstName.firstName,
      CHECKOUT_INFO.missingFirstName.lastName,
      CHECKOUT_INFO.missingFirstName.zipCode
    );
    await checkoutPage.clickContinue();
    await expect(checkoutPage.errorMessage).toBeVisible();
    await checkoutPage.verifyElementText(
      checkoutPage.errorMessage, EXPECTED_TEXT.firstNameRequired);
  });

  test('should cancel checkout and return to cart', async ({ checkoutPage, cartPage }) => {
    await checkoutPage.clickCancel();
    await expect(checkoutPage.page).toHaveURL(/cart/);
    await checkoutPage.verifyElementText(cartPage.cartTitle, PAGE_TITLES.cartTitle);
  });

  test.describe('Checkout Step Two', () => {
    test.beforeEach(async ({ checkoutPage }) => {
      await checkoutPage.fillCheckoutInfo(
        CHECKOUT_INFO.valid.firstName,
        CHECKOUT_INFO.valid.lastName,
        CHECKOUT_INFO.valid.zipCode
      );
      await checkoutPage.clickContinue();
    });

    test('should display correct URL on checkout step two', async ({ checkoutStepTwoPage }) => {
      await expect(checkoutStepTwoPage.page).toHaveURL(URLS.checkoutStepTwo);
    });

    test('should display correct title on checkout step two', async ({ checkoutStepTwoPage }) => {
      await checkoutStepTwoPage.verifyElementText(
        checkoutStepTwoPage.overviewTitle,
        PAGE_TITLES.checkoutStepTwoTitle
      );
    });

    test('should display added item on checkout overview', async ({ checkoutStepTwoPage }) => {
      const isBackpackVisible = await checkoutStepTwoPage.isItemVisible(CART_ITEMS.backPack);
      expect(isBackpackVisible).toBe(true);
    });
  });
});