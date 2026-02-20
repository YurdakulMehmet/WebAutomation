import { Page,expect } from "@playwright/test";
export class ProductDetailPage {
  constructor(private page: Page) {
    (page);
  }

  // İlk ürüne tıklama
  async openFirstProduct() {
    const firstProduct = this.page.locator('[data-test-id="title-1"]').nth(1);
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
    await this.page.waitForTimeout(5000); // Detay sayfasının tam yüklenmesi için bekleme
  }

  // Ürünü sepete ekleme ve toast yüklenmesini bekleme
  async addToCartAndWait() { 
    const addToCartButton = this.page.locator('[data-test-id="addToCart"]');
    await addToCartButton.click();

    await expect(this.page.getByRole('button', { name: /sepete git/i })).toBeVisible({ timeout: 10000 });
}
}