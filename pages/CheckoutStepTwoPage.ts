import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutStepTwoPage extends BasePage {
  private readonly overviewTitleXPath = '//span[@class="title"]';
  private readonly cartItemNameXPath = '//div[@class="inventory_item_name"]';
  private readonly finishButtonXPath = '//button[@id="finish"]';
  private readonly cancelButtonXPath = '//button[@id="cancel"]';

  readonly overviewTitle: Locator;
  readonly cartItemNames: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.overviewTitle = page.locator(this.overviewTitleXPath);
    this.cartItemNames = page.locator(this.cartItemNameXPath);
    this.finishButton = page.locator(this.finishButtonXPath);
    this.cancelButton = page.locator(this.cancelButtonXPath);
  }

  async clickFinish() {
    await this.clickElement(this.finishButton);
  }

  async clickCancel() {
    await this.clickElement(this.cancelButton);
  }

  async isItemVisible(itemName: string): Promise<boolean> {
    const item = this.cartItemNames.filter({ hasText: itemName });
    return await item.isVisible();
  }
}