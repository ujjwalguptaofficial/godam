import { clone, computed, Expression, Room } from "godam";

class FruitExpression extends Expression {
    @computed('items')
    get fruitsLength() {
        return this.get<any[]>('items').length;
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