import { clone, Computed, Expression, Room } from "godam";

class FruitExpression extends Expression {
    @Computed('items')
    get fruitsLength() {
        return this.get('items').length;
    }
}
export default new Room({
    state: {
        items: [],
        initialFruits: ["Banana", "Orange", "Apple", "Mango"]
    },
    mutation: {
        initializeFruits() {
            this.state.items = clone(
                this.state.initialFruits
            );
        }
    },
    expression: FruitExpression
})