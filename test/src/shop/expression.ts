import { Expression, Computed } from "godam";
import { ShopState } from "./state";

export class ShopExpression extends Expression<ShopState> {

    @Computed('products')
    get productsCount() {
        return this.get('products').length;
    }
}