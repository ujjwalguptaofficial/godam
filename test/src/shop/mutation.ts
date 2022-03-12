import { Mutation } from "godam";
import { ShopState } from "./state";

export class ShopMutation extends Mutation<ShopState> {
    addProduct(product) {
        this.state.products.push(product);
    }
    updateProduct(product) {
        const index = this.state.products.findIndex(q => q.id === product.id);
        if (index >= 0) {
            this.state.products[index] = product;
        }
    }

    removeLastProduct() {
        this.state.products.pop();
    }
}