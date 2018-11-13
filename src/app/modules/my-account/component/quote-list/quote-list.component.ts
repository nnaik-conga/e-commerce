import { Component, OnInit } from '@angular/core';
import { QuoteService, Quote, CartService } from '@apttus/ecommerce';
import { Observable } from 'rxjs/Observable';
import { QuoteActions } from './quote-actions.component';
import { Router } from '@angular/router';
import { ACondition } from '@apttus/core';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit {
  currentPage: number = 1;
  limit: number = 10;

  quoteList: Array<CustomQuote>;
  quoteAggregate$: Observable<Array<any>>;
  actionConfiguration: object;

  constructor(private quoteService: QuoteService, private cartService: CartService, private router: Router) {
    this.actionConfiguration = new QuoteActions().actionConfiguration;
  }

  ngOnInit() {
    this.loadQuotes(this.currentPage);
   // this.quoteAggregate$ = this.quoteService.aggregate([new ACondition(Quote, 'Id', 'NotNull', null)]).map(res => res[0]);
    this.quoteAggregate$ = this.quoteService.where([new ACondition(Quote, 'Id', 'NotNull', null)]);
  }

  loadQuotes(page){
    this.quoteList = null;
    this.quoteService.getMyQuotes(null, this.limit, page).subscribe((res: Array<CustomQuote>) => this.quoteList = res);

  }

  downloadPdf(){

  }

  delete(quote: Quote){

  }

  createOrder(){

  }

  submitForApproval(){

  }

  activateCartForQuote(quote: Quote){
    // this.cartService.where(`Apttus_QPConfig__Proposald__c = {0}`, quote.Id)
    this.cartService.where([new ACondition(this.cartService.type, 'QuoteId', 'Equal', quote.Id)])
      .take(1)
      .map(res => res[0])
      .flatMap(cart => this.cartService.setCartActive(cart))
      .subscribe(() => this.router.navigate(['/cart']));
  }

  send(){

  }

}

export class CustomQuote extends Quote{
  Discounted_Price__c: number = 0;
}
