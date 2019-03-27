import { Component, OnInit } from '@angular/core';
import { StorefrontService, Storefront, CategoryService, Category, Product, ProductService } from '@apttus/ecommerce';

import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { ACondition, APageInfo } from '@apttus/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  storefront$: Observable<Storefront>;
  productListA$: Observable<Array<Product>>;
  productListB$: Observable<Array<Product>>;
  categories: Array<Category>;

  constructor(private storefrontService: StorefrontService,
              private categoryService: CategoryService,
              public sanitizer:DomSanitizer,
              private productService: ProductService) {}

  ngOnInit() {
    this.storefront$ = this.storefrontService.getStorefront();

    this.categoryService.getCategoryTree().subscribe(categories => {
      this.categories = [categories[0], categories[1]];
      this.productListA$ = this.productService.getProductsByCategory(categories[0].Id, 5, 0);
      this.productListB$ = this.productService.getProductsByCategory(categories[1].Id, 5, 0);
    });
  }

}
