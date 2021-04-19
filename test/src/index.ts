import { RootState, RootMutation, RootTask } from "./root";
import { Godam } from "godam";
import profileStore from "./profile";
import Account from "./account";

const rooms = {
    profile: profileStore,
    account: Account
}

export const store = new Godam<RootState, RootMutation>({
    state: RootState,
    mutations: RootMutation,
    tasks: RootTask
},
    rooms
)
// store.module.account.STATE.id
//store.module.account.state(store.module.profile.STATE.firstName)