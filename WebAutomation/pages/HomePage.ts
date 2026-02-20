import { Page,expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {  }

  // Ana sayfaya gitme
  async goto() {
    await this.page.goto('https://www.hepsiburada.com');
  }

  // Arama kutusunu kullanarak ürün arama
  async searchBox(){

    const searchBox = this.page.locator('.initialComponent-hk7c_9tvgJ8ELzRuGJwC');
    await searchBox.click();
    const searchBarContent = this.page.locator('.searchBarContent-PbovlvJIZqM7mek9phXc');
    await expect(searchBarContent).toBeVisible();

    const searchInput = this.page.locator('[data-test-id="search-bar-input"]');
    await searchInput.fill('adidas ayakkabı');
    await searchInput.press('Enter');
  }

}