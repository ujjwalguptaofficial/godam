import { clone, computed, Expression, Room } from "godam";

class VeggieExpression extends Expression {
    @computed('items')
    get veggieLength() {
        return Object.keys(this.get('items')).length;
    }

    @computed('items')
    get veggieArray() {
        return Object.values(this.get('items'));
    }
}
export default new Room({
    state: {
        items: {},
        initialFruits: {
            potato: "potato", peas: "peas", spinach: "spinach", brinjal: "brinjal"
        }
    },
    mutation: {
        initializeFruits() {
            this.state.items = clone(
                this.state.initialFruits
            );
        }
    },
    expression: VeggieExpression
})