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

  async filterBySize(size: string) { 
    await this.checkboxClick(size);
    await this.page.reload();
    await expect(this.page).toHaveURL(new RegExp(`bedenler:${size}`));
  }
  async filterByGender(gender: string) {
    await this.checkboxClick(gender);
    await this.page.reload();
    await expect(this.page).toHaveURL(new RegExp(`cinsiyet:${gender}`));
  } 
  async filterByColor(color: string) {
    await this.checkboxClick(color);
    await this.page.reload();
    await expect(this.page).toHaveURL(new RegExp(`renk:${color}`));
    await this.page.waitForLoadState('domcontentloaded');
  }

    
  private appliedMinPrice!: number;
  private appliedMaxPrice!: number;

  async filterByPrice(minPrice: number, maxPrice: number) {
    
    this.appliedMinPrice = minPrice;
    this.appliedMaxPrice = maxPrice;

    const priceFilterHeader = this.page.getByText('Fiyat Araliği').first();
    const minPriceInput = this.page.getByRole('textbox', { name: 'En az' });
    const maxPriceInput = this.page.getByRole('textbox', { name: 'En çok' });

    if (!(await minPriceInput.isVisible())) {
    await priceFilterHeader.click();
  }
    await minPriceInput.fill(minPrice.toString());
    await maxPriceInput.fill(maxPrice.toString());
    await this.page.getByRole('button', { name: 'Filtrele' }).click();
    await this.page.reload();
  }
  // Ürün Fiyat Doğrulama (Reklam gelirse reklamdaki fiyattan dolayı hata verebilir)
async filterAssertions() {
  const priceText = await this.page.locator('[data-test-id="final-price-1"]').innerText();
  const price = Number(
    priceText
      .replace(/\s/g, '')
      .replace('TL', '')
      .replace(/\./g, '')
      .replace(',', '.')
  );

  expect(price).toBeGreaterThanOrEqual(this.appliedMinPrice);
  expect(price).toBeLessThanOrEqual(this.appliedMaxPrice);
}
}
