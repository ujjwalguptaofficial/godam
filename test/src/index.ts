import { RootState, RootMutation } from "./root";
import { Godam } from "godam";
import profileStore from "./profile";
import Account from "./account";

class moduleVal {
    profile = profileStore;
    account = Account
}

export const store = new Godam<RootState, RootMutation>({
    state: RootState,
    mutations: RootMutation
},
    moduleVal
)
// store.module.account.STATE.id
//store.module.account.state(store.module.profile.STATE.firstName)