import { Room } from "godam";
import { ShopMutation } from "./mutation";
import { ShopState } from "./state";
import { ShopExpression } from "./expression";

export default new Room<ShopState, ShopMutation, ShopExpression>({
    state: ShopState,
    mutations: ShopMutation,
    expressions: ShopExpression
})