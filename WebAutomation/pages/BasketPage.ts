import { Page,expect} from "@playwright/test";

export class BasketPage {
  constructor(private page: Page) {  }

    // Sepet sayfasına gitme
  async checkBasketPage() {

    const cartButton = this.page.getByRole('button', { name: 'Sepete git' });
    await expect(cartButton).toBeVisible();
    await cartButton.click();
  }
  
  // Sepet sayfasında olduğumuzu doğrula
  async assertBasketLoaded() {
    await expect(this.page).toHaveURL(/sepetim|basket|checkout/);
  }
}