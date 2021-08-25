import { RootState, RootMutation, RootTask, RootExpression } from "./root";
import { Godam } from "godam";
import profileStore from "./profile";
import Account from "./account";
import Shop from "./shop";

const rooms = {
    profile: profileStore,
    account: Account,
    shop: Shop
}

export const store = new Godam<RootState, RootMutation, RootExpression, RootTask>({
    state: RootState,
    mutations: RootMutation,
    tasks: RootTask,
    expressions: RootExpression
},
    rooms
)
// store.module.account.STATE.id
//store.module.account.state(store.module.profile.STATE.firstName)