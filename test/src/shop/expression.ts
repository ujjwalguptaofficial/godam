import { Expression, computed } from "godam";
import { ShopState } from "./state";

export class ShopExpression extends Expression<ShopState> {

    @computed('products')
    get productsCount() {
        return this.get('products').length;
    }

    @computed('products')
    get lastProduct() {
        const products = this.get('products');
        return products[products.length - 1];
    }
}