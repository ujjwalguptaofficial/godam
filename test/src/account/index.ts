import { Godam, Mutations } from "godam";

class AccountState {
    id: string = ""
}
class AccountMutation extends Mutations<AccountState> {
    setId(value) {
        this.state.id = value;
    }
}

export default new Godam<AccountState>({
    state: AccountState,
    mutations: AccountMutation
})