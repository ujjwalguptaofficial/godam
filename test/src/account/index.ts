import { Godam, Mutations, Room } from "godam";

class AccountState {
    id: string = ""
}
class AccountMutation extends Mutations<AccountState> {
    setId(value) {
        this.state.id = value;
    }
}

export default new Room({
    state: AccountState,
    mutations: AccountMutation
})