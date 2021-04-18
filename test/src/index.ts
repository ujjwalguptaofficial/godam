import { RootState } from "./root";
import { Godam } from "godam";
import profileStore from "./profile";
import Account from "./account";

class moduleVal {
    // profile = profileStore;
    // account = Account
    fas = "as"
}

export const store = new Godam<RootState, moduleVal>({
    state: RootState
},
    moduleVal
)
// store.module.account.STATE.id
store.module.fas
//store.module.account.state(store.module.profile.STATE.firstName)