import { Godam } from "godam";

class AccountState {
    id: string;
}

export default new Godam<AccountState>({
    state: AccountState
})