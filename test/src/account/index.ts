import { Godam, Mutations, Room } from "godam";

class AccountState {
    id: string = ""
}
class AccountMutation extends Mutations<AccountState> {
    setId(value) {
        this.state.id = value;
    }
}

export const room = new Room<AccountState, AccountMutation>({
    state: AccountState,
    mutations: AccountMutation
})
// room.set("state");

export default room;