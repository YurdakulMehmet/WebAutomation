import { Page,expect } from '@playwright/test';
export class ProductListPage  { 
  constructor(private page: Page) { (page); }

  async checkListPage() {
  // URL doğrulama 
  await expect(this.page).toHaveURL(/adidas/);

   // Ürün listesi 
   await expect(this.page.locator('[class*="productCard"]').first()).toBeVisible();
  }

  private async checkboxClick(checkboxName: string) { 
  // Checkbox'a force click yap ve event tetikle 
  await this.page.waitForTimeout(1000);
  const checkbox = this.page.getByRole('checkbox', { name: checkboxName, exact: true });
  await checkbox.click();
  
}

  async filterBySize() { 
    await this.checkboxClick('39');
    await this.page.reload();
    await expect(this.page).toHaveURL(/bedenler:39/);
  }
  async filterByGender() {
    await this.checkboxClick('Erkek');
    await this.page.reload();
    await expect(this.page).toHaveURL(/cinsiyet:Erkek/);
  } 
  async filterByColor() {
    await this.checkboxClick('Beyaz');
    await this.page.reload();
    await expect(this.page).toHaveURL(/renk:Beyaz/);
  }

  async filterByPrice() {
    const priceFilterHeader = this.page.getByText('Fiyat Araliği').nth(0);
    const minPriceInput = this.page.getByRole('textbox', { name: 'En az' });
    const maxPriceInput = this.page.getByRole('textbox', { name: 'En çok' });

  // Eğer fiyat inputları görünür değilse, filtreyi aç
  if (!(await minPriceInput.isVisible())) {
    await priceFilterHeader.click();
    await this.page.waitForTimeout(1000); 
  }

  await minPriceInput.fill('3000');
  await maxPriceInput.fill('5000');
  await this.page.getByRole('button', { name: 'Filtrele' }).click();
  await this.page.reload();
  await expect(this.page).toHaveURL(/fiyat:3000-5000/);
  }
  
  // Ürün Fiyat Doğrulama (Reklam gelirse reklamdaki fiyattan dolayı hata verebilir)
async filterAssertions() {
  const priceText = await this.page.locator('[data-test-id="loader-false"] [data-test-id="add-to-cart-button-1"]').innerText();

  const price = Number(
    priceText
      .replace(/\s/g, '')
      .replace('TL', '')
      .replace(/\./g, '')
      .replace(',', '.')
  );

  expect(price).toBeGreaterThanOrEqual(3000);
  expect(price).toBeLessThanOrEqual(5000);
}
}
