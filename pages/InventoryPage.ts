import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    private readonly inventoryItemXPath = '//div[@class="inventory_item"]';
    private readonly pageTitleXPath = '//span[@class="title"]';
    private readonly cartIconXPath = '//a[@class="shopping_cart_link"]';
    private readonly addToCartXPath = '//button[contains(text(),"Add to cart")]';
    private readonly addToCartText = 'Add to cart';

    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator(this.pageTitleXPath);
        this.inventoryItems = page.locator(this.inventoryItemXPath);
        this.cartIcon = page.locator(this.cartIconXPath);
    }

    async getItemCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async addItemToCartByName(itemName: string) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        await item.locator(this.addToCartXPath, { hasText: this.addToCartText }).click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}