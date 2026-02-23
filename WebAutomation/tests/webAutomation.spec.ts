import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { BasketPage } from '../pages/BasketPage';

test('has title', async ({ page }) => {

  const homePage = new HomePage(page);
  const productListPage = new ProductListPage(page);
  const productDetailPage = new ProductDetailPage(page);
  const basketPage = new BasketPage(page);

  // Ana sayfaya gitme ve ürün arama
  await homePage.goto();
  await homePage.searchBox();

  // Ürün listeleme sayfasında doğrulama ve filtreleme işlemleri
  await productListPage.checkListPage();
  await productListPage.filterBySize("39");
  await productListPage.filterByGender("Erkek");
  await productListPage.filterByColor("Beyaz");
  await productListPage.filterByPrice(3000, 5000);
  await productListPage.filterAssertions();

  // Detay sayfasına gitme ve doğrulama işlemleri
  await productDetailPage.openFirstProduct();
  await productDetailPage.addToCartAndWait();

  // Sepet sayfasına gitme ve doğrulama işlemleri
  await basketPage.checkBasketPage();
  await basketPage.assertBasketLoaded();
  }

);
