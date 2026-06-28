import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUTS } from '../data/testData';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async fillElement(locator: Locator, value: string) {
        await this.waitForElementVisible(locator);
        await locator.fill(value);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async waitForElementVisible(locator: Locator, timeout = TIMEOUTS.defaultWait) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async getElementText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? '';
    }

    async verifyElementText(locator: Locator, expectedText: string) {
        await expect(locator).toHaveText(expectedText);
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }

    async clickElement(locator: Locator) {
        await this.waitForElementVisible(locator);
        await locator.click();
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    }
}