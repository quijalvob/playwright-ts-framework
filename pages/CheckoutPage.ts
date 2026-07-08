import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly firstNameXPath = '//input[@id="first-name"]';
  private readonly lastNameXPath = '//input[@id="last-name"]';
  private readonly zipCodeXPath = '//input[@id="postal-code"]';
  private readonly continueButtonXPath = '//input[@id="continue"]';
  private readonly cancelButtonXPath = '//button[@id="cancel"]';
  private readonly checkoutTitleXPath = '//span[@class="title"]';
  private readonly errorMessageXPath = '//h3[@data-test="error"]';

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly checkoutTitle: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator(this.firstNameXPath);
    this.lastNameInput = page.locator(this.lastNameXPath);
    this.zipCodeInput = page.locator(this.zipCodeXPath);
    this.continueButton = page.locator(this.continueButtonXPath);
    this.cancelButton = page.locator(this.cancelButtonXPath);
    this.checkoutTitle = page.locator(this.checkoutTitleXPath);
    this.errorMessage = page.locator(this.errorMessageXPath);
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.fillElement(this.firstNameInput, firstName);
    await this.fillElement(this.lastNameInput, lastName);
    await this.fillElement(this.zipCodeInput, zipCode);
  }

  async clickContinue() {
    await this.clickElement(this.continueButton);
  }

  async clickCancel() {
    await this.clickElement(this.cancelButton);
  }
}