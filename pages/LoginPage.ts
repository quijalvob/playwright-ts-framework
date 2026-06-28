import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../data/testData';

export class LoginPage extends BasePage {
  private readonly usernameInputXPath = '//input[@name="user-name"]';
  private readonly passwordInputXPath = '//input[@name="password"]';
  private readonly loginButtonXPath = '//input[@id="login-button"]';
  private readonly errorMessageXPath = '//h3[@data-test="error"]';

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator(this.usernameInputXPath);
    this.passwordInput = page.locator(this.passwordInputXPath);
    this.loginButton = page.locator(this.loginButtonXPath);
    this.errorMessage = page.locator(this.errorMessageXPath);
  }

  async navigate() {
    await this.goto(URLS.base);
  }

  async login(username: string, password: string) {
    await this.fillElement(this.usernameInput, username);
    await this.fillElement(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    await this.takeScreenshot('login attempt');
  }
}