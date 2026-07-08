import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartItemNameXPath = '//div[@class="inventory_item_name"]';
  private readonly cartTitleXPath = '//span[@class="title"]';
  private readonly checkoutButtonXPath = '//button[@id="checkout"]';

  readonly cartItemNames: Locator;
  readonly cartTitle: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItemNames = page.locator(this.cartItemNameXPath);
    this.cartTitle = page.locator(this.cartTitleXPath);
    this.checkoutButton = page.locator(this.checkoutButtonXPath);
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItemNames.allTextContents();
  }

  async isItemInCart(itemName: string): Promise<boolean> {
    const item = this.cartItemNames.filter({ hasText: itemName });
    return await item.isVisible();
  }

  async clickCheckout() {
    await this.clickElement(this.checkoutButton);
  }
}