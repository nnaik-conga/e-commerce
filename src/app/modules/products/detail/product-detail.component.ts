import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of, Observable } from 'rxjs';
import { switchMap, map as rmap, distinctUntilKeyChanged } from 'rxjs/operators';
import { get, isNil, find, forEach, defaultTo } from 'lodash';
import {
    CartService,
    CartItem,
    ConstraintRuleService,
    Product,
    ProductService,
    ProductInformationService,
    ProductInformation,
    PriceListItemService
} from '@apttus/ecommerce';
import { ProductConfigurationComponent, ProductConfigurationSummaryComponent } from '@apttus/elements';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
/**
 * Product Details Component is the details of the product for standalone and bundle products with attributes and options.
 */
export class ProductDetailComponent implements OnInit {

    viewState$: Observable<ProductDetailsState>;

    recommendedProducts$: Observable<Array<Product>>;

    attachments$: Observable<Array<ProductInformation>>;

    cartItemList: Array<CartItem>;

    product: Product;

    /**
     * Flag to detect if there is change in product configuration.
     */
    configurationChanged: boolean = false;

    /** @ignore */
    productCode: string;

    @ViewChild(ProductConfigurationSummaryComponent, { static: false })
    configSummaryModal: ProductConfigurationSummaryComponent;
    @ViewChild(ProductConfigurationComponent, { static: false })
    productConfigComponent: ProductConfigurationComponent;

    constructor(private cartService: CartService,
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private productInformationService: ProductInformationService,
        private crService: ConstraintRuleService) {
    }

    ngOnInit() {
        this.viewState$ = this.route.params.pipe(
            switchMap(params => {
                this.product = null;
                this.cartItemList = null;
                const product$ = (this.product instanceof Product && get(params, 'id') === this.product.Id) ? of(this.product) :
                    this.productService.fetch(get(params, 'id'));
                let cartItem$ = of(null);
                if(get(params, 'cartItem'))
                    cartItem$ = this.cartService.getMyCart().pipe(
                        rmap(cart => find(get(cart, 'LineItems'), { Id: get(params, 'cartItem') })),
                        distinctUntilKeyChanged('TotalQuantity')
                    );
                return combineLatest([product$, cartItem$]);
            }),
            rmap(([product, cartItemList]) => {
                const pli = PriceListItemService.getPriceListItemForProduct(product as Product);
                return {
                    product: product as Product,
                    relatedTo: cartItemList,
                    quantity: isNil(cartItemList) ? defaultTo(get(pli, 'DefaultQuantity'), 1) : get(cartItemList, 'Quantity', 1)
                };
            })
        );

        this.recommendedProducts$ = this.route.params.pipe(
            switchMap(params => this.crService.getRecommendationsForProducts([get(params, 'id')])),
            rmap(r => Array.isArray(r) ? r : [])
        );

        this.attachments$ = this.route.params.pipe(
            switchMap(params => this.productInformationService.getProductInformation(get(params, 'id')))
        );
    }

    /**
     * onConfigurationChange method is invoked whenever there is change in product configuration and this method sets flag
     * isConfigurationChanged to true.
     */
    onConfigurationChange([product, cartItemList, status]) {
        this.product = product;
        this.cartItemList = cartItemList;
        if (get(status, 'optionChanged') || get(status, 'attributeChanged')) this.configurationChanged = true;
    }
    /**
     * Change the product quantity and update the primary cartItem
     * to see the updated the netprice of the product.
     */
    changeProductQuantity(newQty: any) {
        if (this.cartItemList && this.cartItemList.length > 0)
            forEach(this.cartItemList, c => {
                if (c.LineType === 'Product/Service') c.Quantity = newQty;
                this.productConfigComponent.changeProductQuantity(newQty);
            });
    }

    /**
     * Changes the quantity of the cart item passed to this method.
     *
     * @param cartItem Cart item reference to the cart line item object.
     * @fires CartService.updateCartItems()
     */

    handleStartChange(cartItem: CartItem) {
        this.cartService.updateCartItems([cartItem]);
    }

    onAddToCart(cartItems: Array<CartItem>): void {
        this.configurationChanged = false;
        const primaryItem = find(cartItems, i => get(i, 'IsPrimaryLine') === true && isNil(get(i, 'Option')));
        if (!isNil(primaryItem) && (get(primaryItem, 'Product.HasOptions') || get(primaryItem, 'Product.HasAttributes'))) {
            this.router.navigate(['/products', get(this, 'product.Id'), get(primaryItem, 'Id')]);
        }
    }

    /**
     * Changes the quantity of the cart item passed to this method.
     *
     * @param cartItem Cart item reference to the cart line item object.
     * @fires CartService.updateCartItems()
     */
    handleEndDateChange(cartItem: CartItem) {
        this.cartService.updateCartItems([cartItem]);
    }

    showSummary() {
        this.configSummaryModal.show();
    }
}

/** @ignore */
export interface ProductDetailsState {
    /**
     * The product to display.
     */
    product: Product;
    /**
     * The CartItem related to this product.
     */
    relatedTo: CartItem;
    /**
     * Quantity to set to child components
     */
    quantity: number;
}
