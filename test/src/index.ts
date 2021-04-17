import { RootState } from "./root";
import { Godam } from "godam";
import profileStore from "./profile";
import Account from "./account";

const module = {
    profile: profileStore,
    account: Account
}

export const store = new Godam<RootState, void, void, void, typeof module>({
    state: RootState
},
    module
)

//store.module.account.state(store.module.profile.STATE.firstName)