import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, Category, SearchResults, SearchService, PriceTier, PriceListItem } from '@apttus/ecommerce';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import { DOCUMENT} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { ACondition } from '@apttus/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public category: Category;
  public subCategories: Array<Category>;
  public searchResults$: Observable<SearchResults>;

  page = 1;
  pageSize = 10;
  view='grid';
  priceTier: PriceTier = null;
  categoryFilter: Array<Category> = [];
  customFilters: Array<ACondition> = null;
  sortField: string = null;
  isSearch: boolean = false;
  query: string;

  constructor(private activatedRoute: ActivatedRoute,
              private searchService: SearchService,
              private categoryService: CategoryService,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.categoryFilter = [];
      this.customFilters = new Array();
      this.priceTier = null;
      this.sortField = null;

      if(params['categoryName']){
        // this.categoryService.where(`Name = '` + params['categoryName'] + `'`)
        this.categoryService.where([new ACondition(Category, 'Name', 'Equal', params['categoryName'])])
          .map(categoryList => categoryList[0])
          .subscribe(category => {
            this.isSearch = false;
            this.category = category;
            this.getResults();
            this.categoryService.getSubcategories(this.category.Id)
              .subscribe(subcategories => this.subCategories = subcategories);
          });
      }else if(params['query']){
        this.query = params['query'];
        this.isSearch = true;
        this.getResults();
      }
    });
  }

  getResults(){
      if(this.sortField == 'Relevance') this.sortField = null;
      this.scrollTop();
      if(!this.isSearch){
        this.searchResults$ = this.searchService.searchProductsByCategory(this.category.Id, this.pageSize, this.page, this.sortField, 'ASC', this.categoryFilter, this.priceTier
          , this.customFilters.map(f => new ACondition(PriceListItem, `Product.${f.field}`, 'Equal', f.value)));
      }else
        this.searchResults$ = this.searchService.getSearchResults(this.query, this.pageSize, this.page, this.sortField, 'ASC',
          this.categoryFilter, this.priceTier, this.customFilters);
  }

  scrollTop(){
    setTimeout(() => {
      let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({document: this.document, scrollTarget: '#top', pageScrollDuration : 200});
      this.pageScrollService.start(pageScrollInstance);
    });
  }

  onPage(evt){
    this.page = evt.page;
    this.getResults();
  }

  onPriceTierChange(evt){
    this.page = 1;
    this.priceTier = evt;
    this.getResults();
  }

  onSubcategoryFilter(evt){
    this.page = 1;
    this.categoryFilter = evt;
    this.getResults();
  }

  onFieldFilter(evt: ACondition){
    const index = _.findIndex(this.customFilters, { field: evt.field });

    if(evt.value === 'null' || evt.value === null)
      this.customFilters = this.customFilters.filter(a => a.field !== evt.field);
    else if(index >= 0){
      this.customFilters[index] = evt;
    }else
      this.customFilters.push(evt);

    this.page = 1;
    this.getResults();
  }

  onSortChange(evt){
    this.page = 1;
    this.sortField = evt;
    this.getResults();
  }

  onPageSizeChange(event){
    this.pageSize = event;
    this.getResults();
  }
}
